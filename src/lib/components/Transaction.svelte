<script>
	export let transaction;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	let transactionDate = new Date(transaction.date);
	transactionDate = `${transactionDate.getMonth() + 1}/${transactionDate.getDate()}/${transactionDate.getFullYear()}`;

	let recurring = transaction.recurring ? 'Yes' : 'No';

	let amount = transaction.amount / 100;
	if (transaction.type === 'withdrawal') {
		amount = amount * -1;
	}
	amount = amount.toFixed(2);

	let runningTotal = (transaction.runningTotal / 100).toFixed(2);
</script>

<tr>
	<td>{transactionDate}</td>
	<td class="mobile-hide">{recurring}</td>
	<td>{transaction.description}</td>
	<td class="mobile-hide">{transactionType}</td>
	{#if transaction.type === 'deposit'}
		<td class="currency deposit">${amount}</td>
	{:else if transaction.type === 'withdrawal'}
		<td class="currency withdrawal">${amount}</td>
	{:else}
		<td class="currency">${amount}</td>
	{/if}
	<td class="mobile-hide currency">${runningTotal}</td>
	<td>
		<!-- Call delete function in +page.server.js -->
		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={transaction.id} />
			<input type="hidden" name="transactionsData" />
			<button>X</button>
		</form>
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

	.mobile-hide {
		display: none;
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

	@media (min-width: 640px) {
		.mobile-hide {
			display: table-cell;
		}
	}
</style>
