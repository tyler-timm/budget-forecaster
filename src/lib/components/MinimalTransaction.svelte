<script>
	export let transaction;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	let tranDate = new Date(transaction.date);

    let amount = transaction.amount / 100;
	if (transaction.type === 'withdrawal') {
		amount = amount * -1;
	}
	amount = amount.toFixed(2);
</script>

<tr>
	<td>{tranDate.getDate()}</td>
	<td>{transaction.description}</td>
	{#if transaction.type === 'deposit'}
		<td class="currency deposit">${amount}</td>
	{:else if transaction.type === 'withdrawal'}
		<td class="currency withdrawal">${amount}</td>
	{:else}
		<td class="currency">${amount}</td>
	{/if}
	<td>
        <button>X</button>
    </td>
</tr>

<style>
    td {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
    }

    .currency {
		text-align: end;
	}

    .deposit {
        color: #18d15c;
    }

    .withdrawal {
        color: #f72c2c;
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