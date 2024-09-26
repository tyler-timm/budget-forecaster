<script>
	import Icon from '@iconify/svelte';
	export let transaction;
	let edit = false;

	let transactionType = transaction.type;
	transactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

	const transactionDate = new Date(transaction.date);
	let recurring = transaction.recurring ? 'Yes' : 'No';

	let amount = transaction.amount / 100;
	if (transaction.type === 'withdrawal') {
		amount = amount * -1;
	}
	amount = amount.toFixed(2);

	let runningTotal = (transaction.runningTotal / 100).toFixed(2);

	let transactionTypes = [
		{
			id: 'deposit',
			name: 'Deposit'
		},
		{
			id: 'withdrawal',
			name: 'Withdrawal'
		}
	];

	let newTransactionDateString = transactionDate.toLocaleDateString();
	let newRecurring = recurring;
	let newDescription = transaction.description;
	let newSelectedTransactionType = transaction.type;
	let newAmount = amount;
</script>

<tr>
	{#if !edit}
		<td>{transactionDate.toLocaleDateString()}</td>
		<td class="mobile-hide">{recurring}</td>
		<td>{transaction.description}</td>
		<td class="mobile-hide">{transactionType}</td>
		<td class="currency {transaction.type === 'deposit' ? 'deposit' : ''}">${amount}</td>
		<td class="mobile-hide currency">${runningTotal}</td>
	{:else}
		<td>
			<input type="date" name="date" bind:value={newTransactionDateString} />
		</td>
		<td>
			<input type="checkbox" name="recurring" bind:checked={newRecurring} />
		</td>
		<td>
			<input type="text" name="description" bind:value={newDescription} />
		</td>
		<td>
			<select name="type" id="type" bind:value={newSelectedTransactionType}>
				{#each transactionTypes as transactionType}
					<option
						value={transactionType.id}
						selected={transactionType.id === newSelectedTransactionType}
					>
						{transactionType.name}
					</option>
				{/each}
			</select>
		</td>
		<td>
			<input type="text" name="amount" bind:value={newAmount} />
		</td>
		<td class="mobile-hide currency">${runningTotal}</td>
	{/if}
	<td>
		<!-- Call delete function in +page.server.js -->
		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={transaction.id} />
			<input type="hidden" name="transactionsData" />
			<button class="delete"><Icon icon="ri:delete-bin-line" /></button>
		</form>
	</td>
	<td>
		<button class="edit" on:click={() => (edit = !edit)}>
			<Icon icon="ri:edit-2-line" />
		</button>
	</td>
	<td>
		{#if edit}
			<!-- Call edit function in +page.server.js -->
			<form method="POST" action="?/edit">
				<input type="hidden" name="id" value={transaction.id} />
				<input type="hidden" name="date" value={newTransactionDateString} />
				<input type="hidden" name="recurring" value={newRecurring} />
				<input type="hidden" name="description" value={newDescription} />
				<input type="hidden" name="type" value={newSelectedTransactionType} />
				<input type="hidden" name="amount" value={newAmount} />
				<button class="submit-edit"><Icon icon="ri:checkbox-circle-line" /></button>
			</form>
		{/if}
	</td>
</tr>

<style>
	td {
		padding-left: 0.25rem;
		padding-right: 0.25rem;
	}

	button {
		border: transparent;
		background-color: transparent;
		border-radius: 0.25rem;
		font-size: 1rem;
	}

	.delete:hover {
		background-color: #7f1d1d;
		color: white;
	}

	.edit:hover {
		background-color: blue;
		color: white;
	}

	.submit-edit:hover {
		background-color: green;
		color: white;
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

	@media (min-width: 640px) {
		.mobile-hide {
			display: table-cell;
		}
	}
</style>
