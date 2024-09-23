<script>
	import MinimalTransaction from './MinimalTransaction.svelte';
	export let data;
	let open = true;
	$: transactions = data.recurringTransactions;
	$: total = data.recurringTotal;
</script>

<div class="container mobile-hide">
	<button on:click={() => (open = !open)}> Show/Hide </button>
	<aside class="card-shadow" class:open>
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
	}

	.mobile-hide {
		display: none;
	}

	.currency {
		text-align: end;
	}

	.open {
		right: 1rem;
	}

	@media (min-width: 1560px) {
		.mobile-hide {
			display: block;
		}
	}

	aside {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		right: -100%;
		transition: right 0.3s ease-in-out;
		border-radius: 1rem;
		padding: 1rem;
		background-color: white;
		margin-top: 3rem;
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

	button {
		position: fixed;
		right: 1rem;
		background-color: lightgrey;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border-color: transparent;
		display: none;
	}

	button:hover {
		background-color: grey;
	}

	@media (min-width: 1560px) {
		aside {
			position: fixed;
		}

		button {
			display: block;
		}
	}
</style>
