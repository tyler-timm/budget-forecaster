import { getTransactions, addTransaction, deleteTransaction, editTransaction } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";

export async function load(event) {
    if (!event.locals.user) redirect(302, "/login");
    const recurrences = 2;
    let recurringTotal = 0;

    let transactions = await getTransactions();
    transactions = JSON.parse(transactions);
    for (let tran of transactions) {
        tran.clientId = tran.id;

        let amount = parseInt(tran.amount);
        if (tran.type === 'withdrawal') {
            amount = amount * -1;
        }

        let localDate = tran.date.replace('Z', '');
        let transactionDate = new Date(localDate);
        tran.date = transactionDate;
    }

    let recurringTransactions = [];
    const startDate = getStartDate(transactions);
    for (let tran of transactions) {
        if (tran.recurring) {
            let amount = parseInt(tran.amount);
            let recurringAmount = amount;
            if (tran.type === 'withdrawal') {
                amount = amount * -1;
            }

            // Set first recurrence date after start date
            const startMonth = startDate.getMonth();
            const startDay = startDate.getDate();
            const startYear = startDate.getFullYear();
            if (startDay > tran.date.getDate()) {
                tran.date = new Date(startYear, startMonth + 1, tran.date.getDate());
            } else {
                tran.date = new Date(startYear, startMonth, tran.date.getDate());
            }

            for (let i = 1; i < recurrences; i++) {
                let newTran = { ...tran };
                newTran.date = new Date(tran.date).setMonth(tran.date.getMonth() + i);
                newTran.clientId = `${tran.id}-${i}`;
                transactions = [...transactions, newTran];
                // Do NOT add recurring amounts to total here
            }
            recurringTransactions.push(tran)
            recurringTotal = recurringTotal + recurringAmount;
        }
    }

    // Sort transactions by date
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    recurringTransactions.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
    // Filter out transactions before start date
    transactions = transactions.filter(tran => {
        let date = tran.date;
        if (typeof date !== 'number') {
            date = date.getTime();
        }
        return date >= startDate.getTime();
    })

    // Add running totals to each transaction
    let runningTotal = 0;
    for (let transaction of transactions) {
        let amount = parseInt(transaction.amount);
        if (transaction.type === 'withdrawal') {
            amount = amount * -1;
        }
        runningTotal = runningTotal + amount;
        transaction.runningTotal = runningTotal;
    }

    // Calculate total from final transactions array
    let total = transactions.reduce((sum, transaction) => {
        let amount = parseInt(transaction.amount);
        if (transaction.type === 'withdrawal') {
            amount = amount * -1;
        }
        return sum + amount;
    }, 0);

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

        let startingBalance = formData.get('new-starting-balance');
        let newStartingBalance = false;
        if (startingBalance === 'on') {
            newStartingBalance = true;
        }

        let recurringMonthly = formData.get('recurring-monthly');
        let recurring = false;
        if (recurringMonthly === 'on') {
            recurring = true;
        }

        let date = formData.get('date');

            // Always parse date as UTC
            const newTransactionData = {
                date: date ? new Date(`${date}T00:00:00.000Z`) : new Date(),
                type: formData.get('type'),
                description: formData.get('description'),
                newStartingBalance: newStartingBalance,
                recurring: recurring,
                amount: amount
            }
        console.log('newTransactionData', newTransactionData);
        const response = await addTransaction(newTransactionData);
        console.log('add transaction response', response);

        return { success: true }
    },

    edit: async ({ request }) => {
        const formData = await request.formData();
        console.log('formData', formData);
        let amount = formData.get('amount');
        amount = amount * 100;

            // Always parse date as UTC
            const newTransactionData = {
                id: formData.get('id'),
                date: formData.get('date') ? new Date(`${formData.get('date')}T00:00:00.000Z`) : new Date(),
                type: formData.get('type'),
                description: formData.get('description'),
                recurring: formData.get('recurring'),
                amount: amount
            }
        console.log('newTransactionData', newTransactionData);
        const response = await editTransaction(newTransactionData);
        console.log('edit transaction response', response);
        return response;
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

function getStartDate(transactions) {
    let startDate = transactions[0].date;
    for (const tran of transactions) {
        if (tran.new_starting_balance && tran.date > startDate) {
            startDate = tran.date;
        }
    }
    return startDate;
}