import { getTransactions } from '$lib/db';
import { redirect } from '@sveltejs/kit';

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

        if (typeof tran.date === 'string' && tran.date.includes('T')) {
            tran.date = tran.date.split('T')[0]; // Gets 'YYYY-MM-DD'
        }

        total = total + amount;
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
            const tranDate = new Date(tran.date + 'T00:00:00');
            const startMonth = startDate.getMonth();
            const startDay = startDate.getDate();
            const startYear = startDate.getFullYear();

            let recurringDate;
            if (startDay > tranDate.getDate()) {
                recurringDate = new Date(startYear, startMonth + 1, tranDate.getDate());
            } else {
                recurringDate = new Date(startYear, startMonth, tranDate.getDate());
            }

            tran.date = recurringDate.toISOString().split('T')[0];

            for (let i = 1; i < recurrences; i++) {
                let newTran = { ...tran };
                const nextDate = new Date(recurringDate)
                nextDate.setMonth(nextDate.getMonth() + i);
                newTran.date = nextDate.toISOString().split('T')[0]; // Back to string
                newTran.clientId = `${tran.id}-${i}`;
                transactions = [...transactions, newTran];
                total = total + amount;
            }
            recurringTransactions.push(tran)
            recurringTotal = recurringTotal + recurringAmount;
        }
    }

    // Sort transactions by date
    transactions.sort((a, b) => a.date.localeCompare(b.date));
    recurringTransactions.sort((a, b) => {
        const aDay = new Date(a.date + 'T00:00:00').getDate();
        const bDay = new Date(b.date + 'T00:00:00').getDate();
        return aDay - bDay;
    });

    // Filter out transactions before start date
    transactions = transactions.filter(tran => {
        return tran.date >= startDate.toISOString().split('T')[0];
    });

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
    
    return new Date(startDate + 'T00:00:00');
}