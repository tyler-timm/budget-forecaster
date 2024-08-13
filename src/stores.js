import { writable } from 'svelte/store';
import { getTransactions } from '$lib/db';

const transactionList = await getTransactions();
console.log('transactionList', transactionList);

export const transactions = writable(transactionList);