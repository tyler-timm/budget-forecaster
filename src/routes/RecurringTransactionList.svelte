<script>
	import MinimalTransaction from './MinimalTransaction.svelte';
	export let data;
	$: transactions = data.recurringTransactions;
	$: total = data.recurringTotal;
</script>

<div class="container">
	<aside class="inner-container card-shadow">
		<h2>Recurring Transactions</h2>
		<table>
			<tbody>
				<tr>
					<th>Day</th>
					<th>Description</th>
					<th>Amount</th>
				</tr>

				{#each transactions as transaction (transaction.id)}
					<MinimalTransaction {transaction} />
				{/each}

				<tr>
					<td colspan="2">Total</td>
					<td class="currency">${(total / 100).toFixed(2)}</td>
				</tr>
			</tbody>
		</table>
	</aside>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
        margin-top: 1rem;
	}

	.currency {
		text-align: end;
	}

	aside {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1.25rem;
		right: 1.5rem;
		border-radius: 1rem;
		padding: 1rem;
		background-color: white;
		margin-top: 1rem;
	}

	h2 {
		font-weight: 700;
		font-size: 1.5rem;
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

	@media (min-width: 1560px) {
		aside {
			position: fixed;
		}
	}
</style>
