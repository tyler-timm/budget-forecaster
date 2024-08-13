import { getTransactions } from '$lib/db';

export async function load() {
    return {
        transactions: await getTransactions()
    };
}