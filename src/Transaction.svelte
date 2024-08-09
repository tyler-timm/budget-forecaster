<script>
	export let transaction;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	let tranDate = new Date(transaction.date);
	tranDate = `${tranDate.getMonth() + 1}/${tranDate.getDate()}/${tranDate.getFullYear()}`;

	let recurring = transaction.recurring ? 'Yes' : 'No';
</script>

<tr>
	<td>{tranDate}</td>
	<td class="mobile-hide">{recurring}</td>
	<td>{transaction.description}</td>
	<td class="mobile-hide">{transactionType}</td>
	<td>{(transaction.amount / 100).toFixed(2)}</td>
</tr>

<style>
	.mobile-hide {
		display: none;
	}
	@media (min-width: 640px) {
		.mobile-hide {
			display: table-cell;
		}
	}
</style>
