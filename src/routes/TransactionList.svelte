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
				<th>Description</th>
				<th>Amount</th>
				<th>Running Total</th>
			</tr>
		</thead>
		<tbody>
			{#each transactions as transaction (transaction.clientId)}
				<Transaction {transaction} />
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3">Total:</td>
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
        margin-bottom: 2rem;
	}

	table {
		font-size: 0.75rem;
		line-height: 1.75rem;
		border-radius: 1rem;
	}

    .currency {
		text-align: end;
	}

	@media (min-width: 640px) {
		.container {
			justify-content: start;
		}

        table {
            font-size: 1.125rem;
        }
	}
</style>
