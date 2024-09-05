import { getTransactions, addTransaction, deleteTransaction } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";

export async function load(event) {
    if (!event.locals.user) redirect(302, "/login");
    const recurrences = 2;
    let total = 0;
    let recurringTotal = 0;

    let transactions = await getTransactions();
    transactions = JSON.parse(transactions);
    let recurringTransactions = [];
    for (const tran of transactions) {
        tran.clientId = tran.id;

        let amount = parseInt(tran.amount);
        if (tran.type === 'withdrawal') {
            amount = amount * -1;
        }

        let localDate = tran.date.replace('Z', '');
        let transactionDate = new Date(localDate);

        tran.date = transactionDate;

        total = total + amount;

        if (tran.recurring) {
            for (let i = 1; i < recurrences; i++) {
                let newTran = { ...tran };
                newTran.date = new Date(transactionDate).setMonth(transactionDate.getMonth() + i);
                newTran.clientId = `${tran.id}-${i}`;
                transactions = [...transactions, newTran];
                total = total + amount;
            }
            recurringTransactions.push(tran)
            recurringTotal = recurringTotal + amount;
        }
    }

    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningTotal = 0;
    for (let transaction of transactions) {
        let amount = parseInt(transaction.amount);
        if (transaction.type === 'withdrawal') {
            amount = amount * -1;
        }
        runningTotal = runningTotal + amount;
        transaction.runningTotal = runningTotal;
    }

    console.log('data loaded', new Date());

    return { transactions, total, recurringTransactions, recurringTotal };
}

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        console.log('formData', formData);

        let amount = formData.get('amount');
        if (amount <= 0) return; // TODO: show error
        amount = amount * 100;
        amount = parseInt(amount);

        let recurringMonthly = formData.get('recurring-monthly');
        let recurring = false;
        if (recurringMonthly === 'on') {
            recurring = true;
        }

        let date = formData.get('date');

        const newTransactionData = {
            date: date ? new Date(`${date}T00:00:00.000`) : new Date(),
            type: formData.get('type'),
            description: formData.get('description'),
            recurring: recurring,
            amount: amount
        }
        console.log('newTransactionData', newTransactionData);
        const response = await addTransaction(newTransactionData);
        console.log('add transaction response', response);

        return { success: true }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const response = await deleteTransaction(id);
        console.log('delete transaction response', response);
    },

    signout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/login");
    }

}