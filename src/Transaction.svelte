<script>
	import { deleteTransaction } from '$lib/db.js';
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
	<td>${(transaction.amount / 100).toFixed(2)}</td>
	<td>
		<button on:click={() => deleteTransaction(transaction.id)}>X</button>
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

	@media (min-width: 640px) {
		.mobile-hide {
			display: table-cell;
		}
	}
</style>
