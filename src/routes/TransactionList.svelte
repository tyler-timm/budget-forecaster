<script>
	import Transaction from './Transaction.svelte';
	export let data;
	$: transactions = data.transactions;
	$: total = data.total;
</script>

<div class="container">
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th class="mobile-hide">Monthly</th>
				<th>Description</th>
				<th>Amount</th>
				<th class="mobile-hide">Running Total</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each transactions as transaction (transaction.clientId)}
				<Transaction {transaction} />
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4">Total:</td>
				<td class="currency">${(total / 100).toFixed(2)}</td>
			</tr>
		</tfoot>
	</table>
</div>

<style>
	.container {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		gap: 1.25rem;
        margin-bottom: 2rem;
	}

	table {
		font-size: 1.125rem;
		line-height: 1.75rem;
		border-radius: 1rem;
	}

	th {
		font-weight: 700;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.mobile-hide {
		display: none;
	}

    .currency {
		text-align: end;
	}

	@media (min-width: 640px) {
		.container {
			justify-content: start;
			/* gap: 5rem; */
		}

		.mobile-hide {
			display: table-cell;
		}
	}
</style>
