<script>
	import MinimalTransaction from './MinimalTransaction.svelte';
	export let transactionsData;

	let total = 0;

	let recurringTransactions = transactionsData.filter((tran) => tran.recurring);
	recurringTransactions.forEach((tran) => (total += tran.amount / 100));
	recurringTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

	total = total.toFixed(2);
</script>

<aside class="container">
	<h2>Recurring Transactions</h2>
	<table>
		<tbody>
			<tr>
				<th>Day</th>
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
		right: 1.5rem;
		/* border: 1px solid white; */
		border-radius: 1rem;
		padding: 1rem;
		background-color: white;
		margin-top: 1rem;
		box-shadow: 0 10px 20px hsl(0deg 0% 0% / 0.5);
	}

	h2 {
		/* color: #eab308; */
		font-weight: 700;
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
		margin-top: 0.25rem;
	}

	table {
		font-size: 1.125rem;
	}

	th {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	td {
		padding: 0.5rem;
	}

	@media (min-width: 640px) {
		.container {
			justify-content: center;
			gap: 0.5rem;
		}
	}
	@media (min-width: 1280px) {
		.container {
			position: fixed;
		}
	}
</style>
