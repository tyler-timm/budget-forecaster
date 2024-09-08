<script>
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
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
	let selectedTransactionType;
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
			<input type="date" name="date" value={transactionDate.toLocaleDateString()} />
		</td>
		<td>
			<input type="checkbox" name="recurring" checked={recurring === 'Yes'} />
		</td>
		<td>
			<input type="text" name="description" value={transaction.description} />
		</td>
		<td>
			<select name="type" id="type" bind:value={selectedTransactionType}>
				{#each transactionTypes as transactionType}
					<option value={transactionType.id}>
						{transactionType.name}
					</option>
				{/each}
			</select>
		</td>
		<td>
			<input type="text" name="amount" value={amount} />
		</td>
		<td class="mobile-hide currency">${runningTotal}</td>
	{/if}
	<td>
		<!-- Call delete function in +page.server.js -->
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="id" value={transaction.id} />
			<input type="hidden" name="transactionsData" />
			<button class="delete" n><Icon icon="ri:delete-bin-line" /></button>
		</form>
	</td>
	<td>
		<button class="edit" on:click={() => (edit = !edit)}>
			<Icon icon="ri:edit-2-line" />
		</button>
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
