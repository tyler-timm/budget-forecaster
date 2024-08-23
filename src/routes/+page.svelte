<script>
	import AddTransaction from '$lib/components/AddTransaction.svelte';
	import TransactionList from '$lib/components/TransactionList.svelte';
	import RecurringTransactionList from '$lib/components/RecurringTransactionList.svelte';

	export let data;
	let { transactions } = data;
	transactions = JSON.parse(transactions);
</script>

<AddTransaction />
<RecurringTransactionList transactionsData={transactions} />
<TransactionList transactionsData={transactions} />