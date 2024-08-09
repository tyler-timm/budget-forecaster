<script>
	import { transactions } from './stores.js';
	import MinimalTransaction from './MinimalTransaction.svelte';

	let transactionsData = $transactions;
	let total = 0;

	let recurringTransactions = transactionsData.filter((tran) => tran.recurring);
	recurringTransactions.forEach((tran) => (total += tran.amount / 100));
	recurringTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

	console.log('transactions', transactions);
	total = total.toFixed(2);
</script>

<aside class="container">
	<h2>Recurring Transactions</h2>
	<table>
		<tbody>
			<tr>
				<th>Date</th>
				<th>Description</th>
				<th>Amount</th>
			</tr>

			{#each recurringTransactions as transaction}
				<MinimalTransaction {transaction} />
			{/each}

			<tr>
				<td colspan="2">Total</td>
				<td>{total}</td>
			</tr>
		</tbody>
	</table>
</aside>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 1.25rem;
        right: 0.5rem;
    }

    @media (min-width: 640px) {
    .container {
        justify-content: center;
        gap: 0.5rem;
    }

    @media (min-width: 1280px) {
    .container {
        position: fixed;
    }
}
}
</style>