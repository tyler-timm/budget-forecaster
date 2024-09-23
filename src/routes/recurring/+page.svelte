<script>
	export let data;

	import MinimalTransaction from '../MinimalTransaction.svelte';
	$: transactions = data.recurringTransactions;
	$: total = data.recurringTotal;
</script>

<div class="container">
	<h2>Recurring Transactions</h2>
</div>
<div class="container">
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
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.currency {
		text-align: end;
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
</style>
