<script>
	import Transaction from './Transaction.svelte';
	export let transactionsData;

	let total = 0;
	let rucurrences = 3;  // TODO: use input field to set this value
	// transactionsData.forEach(tran => {
	for (const tran of transactionsData) {
		total += tran.amount / 100;
		if (tran.recurring) {
			for (let i = 1; i < rucurrences; i++) {
				let newTran = { ...tran };
				const tranDate = new Date(tran.date);
				newTran.date = new Date(tranDate).setMonth(tranDate.getMonth() + i);
				transactionsData = [...transactionsData, newTran];
				total += tran.amount / 100;
			}
		}
	}

	transactionsData.sort((a, b) => new Date(a.date) - new Date(b.date));
	// console.log('transactionsData', transactionsData);
	total = total.toFixed(2);
</script>

<div class="container">
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th class="mobile-hide">Monthly</th>
				<th>Description</th>
				<th class="mobile-hide">Type</th>
				<th>Amount</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each transactionsData as transaction}
				<Transaction {transaction} />
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="4">Total:</td>
				<td>{total}</td>
			</tr>
		</tfoot>
	</table>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	table {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	th {
		font-weight: 700;
		position: sticky;
		top: 9rem;
		z-index: 10;
		background-color: #264653;
	}

	.mobile-hide {
		display: none;
	}

	@media (min-width: 640px) {
		.container {
			justify-content: center;
			gap: 5rem;
		}

		.mobile-hide {
			display: table-cell;
		}
	}
</style>
