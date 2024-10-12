<script>
	export let transaction;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	let tranDate = new Date(transaction.date);

	let amount = transaction.amount / 100;
	amount = amount.toFixed(2);
</script>

<tr>
	<td>{tranDate.getDate()}</td>
	<td>{transaction.description}</td>
	<td class="currency {(transaction.type === 'deposit') ? 'deposit' : ''}">${amount}</td>
	<td>
		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={transaction.id} />
			<button class="delete">
				<iconify-icon icon="ri:delete-bin-line" />
			</button>
		</form>
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

	button {
		border: transparent;
		background-color: transparent;
		border-radius: 0.25rem;
		font-size: 1rem;
  padding: 0 .4rem;
		color: black;
	}

	button:hover {
		background-color: #7f1d1d;
	}
</style>
