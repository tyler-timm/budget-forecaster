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
<form method="post" use:enhance>
    <button>Sign out</button>
</form>