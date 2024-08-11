import { writable } from 'svelte/store';
import sql from '$lib/db';

async function getTransactions() {
    const result = await sql`select * from transactions`;
    console.log(result);
    return result;
}

const transactionList = getTransactions();
console.log('transactionList', transactionList);

export const transactions = writable(transactionList);