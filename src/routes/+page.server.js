import { getTransactions, addTransaction, deleteTransaction } from '$lib/db';

export async function load() {
    const transactions = await getTransactions();
    return { transactions };
}

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        console.log('formData', formData);

        let amount = formData.get('amount');
        if (amount <= 0 ) return; // TODO: show error
        amount = amount * 100;

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
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const response = await deleteTransaction(id);
        console.log('delete transaction response', response);
    }
}