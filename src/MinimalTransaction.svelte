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
	<td>
        <button>X</button>
    </td>
</tr>

<style>
    td {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
    }

    button {
		border: 1px solid white;
		background-color: transparent;
		color: white;
		border-radius: 0.25rem;
		font-size: 1rem;
	}

	button:hover {
		background-color: #7f1d1d;
	}
</style>