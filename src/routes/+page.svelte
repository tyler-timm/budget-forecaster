<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';
	import RecurringTransactionList from './RecurringTransactionList.svelte';

	export let data;
</script>

<AddTransaction />
<RecurringTransactionList {data} />
<TransactionList {data} />
