<script>
	import AddTransaction from '../AddTransaction.svelte';
	import TransactionList from '../TransactionList.svelte';
	import RecurringTransactionList from '../RecurringTransactionList.svelte';

	export let data;
	let { transactions } = data;
	transactions = JSON.parse(transactions);
</script>

<AddTransaction />
<RecurringTransactionList transactionsData={transactions} />
<TransactionList transactionsData={transactions} />