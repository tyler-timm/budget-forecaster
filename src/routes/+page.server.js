import { getTransactions, addTransaction, deleteTransaction } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from "$lib/server/auth";

export async function load(event) {
    if (!event.locals.user) redirect(302, "/login");

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

        return { success : true }
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