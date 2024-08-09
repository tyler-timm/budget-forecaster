<script>
	export let transaction;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	let tranDate = new Date(transaction.date);
</script>

<tr>
	<td>{tranDate.getDate()}</td>
	<td>{transaction.description}</td>
	<td>${(transaction.amount / 100).toFixed(2)}</td>
	<td>X</td>
</tr>
