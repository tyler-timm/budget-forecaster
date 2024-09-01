<script>
	import AddTransaction from '$lib/components/AddTransaction.svelte';
	import TransactionList from '$lib/components/TransactionList.svelte';
	import RecurringTransactionList from '$lib/components/RecurringTransactionList.svelte';

	export let data;
</script>

<AddTransaction />
<RecurringTransactionList {data} />
<TransactionList {data} />
