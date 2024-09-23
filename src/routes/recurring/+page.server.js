import { getTransactions } from '$lib/db';
import {  redirect } from '@sveltejs/kit';

export async function load(event) {
    if (!event.locals.user) redirect(302, "/login");
    const recurrences = 2;
    let total = 0;
    let recurringTotal = 0;

    let transactions = await getTransactions();
    transactions = JSON.parse(transactions);
    for (let tran of transactions) {
        tran.clientId = tran.id;

        let amount = parseInt(tran.amount);
        if (tran.type === 'withdrawal') {
            amount = amount * -1;
        }
        // tran.amount = amount;

        let localDate = tran.date.replace('Z', '');
        let transactionDate = new Date(localDate);

        tran.date = transactionDate;

        total = total + amount;
    }

    let recurringTransactions = [];
    const startDate = getStartDate(transactions);
    console.log('startDate', startDate);
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
                total = total + amount;
            }
            recurringTransactions.push(tran)
            recurringTotal = recurringTotal + recurringAmount;
        }
        console.log('date', tran.date);
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
        console.log('date', date);
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

    console.log('data loaded', new Date());

    return { transactions, total, recurringTransactions, recurringTotal };
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