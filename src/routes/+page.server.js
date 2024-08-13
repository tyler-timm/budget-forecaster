import { getTransactions } from '$lib/db';

export async function load() {
    const transactions = await getTransactions();
    return { transactions };
}