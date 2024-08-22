<script>
	import Transaction from './Transaction.svelte';
	export let transactionsData;

	let total = 0;
	let rucurrences = 3; // TODO: use input field to set this value
	// transactionsData.forEach(tran => {
	for (const tran of transactionsData) {
		let amount = tran.amount;
		if (tran.type === 'withdrawal') {
			amount = amount * -1;
		}
		amount = amount / 100;

		total += amount;
		if (tran.recurring) {
			for (let i = 1; i < rucurrences; i++) {
				let newTran = { ...tran };
				const tranDate = new Date(tran.date);
				newTran.date = new Date(tranDate).setMonth(tranDate.getMonth() + i);
				transactionsData = [...transactionsData, newTran];
				total += amount;
			}
		}
	}

	transactionsData.sort((a, b) => new Date(a.date) - new Date(b.date));
	let runningTotal = 0;
	for (let transaction of transactionsData) {
		let amount = transaction.amount;
		if (transaction.type === 'withdrawal') {
			amount = amount * -1;
		}
        runningTotal = runningTotal + amount;
		transaction.runningTotal = runningTotal;
	}

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
				<th class="mobile-hide">Running Total</th>
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
		top: 6rem;
		z-index: 10;
		background-color: #264653;
        padding-left: .5rem;
        padding-right: .5rem;
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
