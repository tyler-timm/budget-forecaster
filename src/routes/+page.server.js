import { getTransactions, addTransaction, deleteTransaction } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";

export async function load(event) {
    if (!event.locals.user) redirect(302, "/login");
    let total = 0;
    let totalWithRecurrences = 0;
    const recurrences = 2;

    let transactions = await getTransactions();
    transactions = JSON.parse(transactions);
    let transactionsWithRecurrences = [...transactions];
    for (const tran of transactions) {
        let amount = tran.amount;
        if (tran.type === 'withdrawal') {
            amount = amount * -1;
        }

        let transactionDate = new Date(tran.date);
        // Add 1 to day to get correct date
        const tranDate = new Date(
            `${transactionDate.getMonth() + 1}-${transactionDate.getDate() + 1}-${transactionDate.getFullYear()}`
        );
        tran.date = tranDate;

        total = total + amount;
        totalWithRecurrences = totalWithRecurrences + amount;

        if (tran.recurring) {
            for (let i = 1; i < recurrences; i++) {
                let newTran = { ...tran };
                newTran.date = new Date(tranDate).setMonth(tranDate.getMonth() + i);
                transactionsWithRecurrences = [...transactionsWithRecurrences, newTran];
                totalWithRecurrences = totalWithRecurrences + amount;
            }
        }
    }

    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningTotal = 0;
    for (let transaction of transactions) {
        let amount = transaction.amount;
        if (transaction.type === 'withdrawal') {
            amount = amount * -1;
        }
        runningTotal = runningTotal + amount;
        transaction.runningTotal = runningTotal;
    }

    let runningTotalWithRecurrences = 0;
    for (let transaction of transactionsWithRecurrences) {
        let amount = transaction.amount;
        if (transaction.type === 'withdrawal') {
            amount = amount * -1;
        }
        runningTotalWithRecurrences = runningTotalWithRecurrences + amount;
        transactionsWithRecurrences.runningTotal = runningTotalWithRecurrences;
    }

    console.log('data loaded', new Date());

    return { transactions, total, transactionsWithRecurrences, totalWithRecurrences };
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

        const newTransactionData = {
            date: formData.get('date') || new Date(),
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