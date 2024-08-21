<script>
	import AddTransaction from '../AddTransaction.svelte';
	import TransactionList from '../TransactionList.svelte';
	import RecurringTransactionList from '../RecurringTransactionList.svelte';
    import { enhance } from '$app/forms';

	export let data;
	let { transactions } = data;
	transactions = JSON.parse(transactions);
</script>

<AddTransaction />
<RecurringTransactionList transactionsData={transactions} />
<TransactionList transactionsData={transactions} />
<form method="post" action="?/signout" use:enhance>
    <button>Sign out</button>
</form>

<style>
    button {
		background-color: #1e1ee9;
        color: white;
		padding: .5rem .75rem;
		border-radius: 0.25rem;
        border: none;
        font-size: 1rem;
        margin-left: 2.5rem;
	}

	button:hover {
		background-color: #1b1bcc;
	}
    
</style>