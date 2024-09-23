<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';
	import RecurringTransactionList from './RecurringTransactionList.svelte';
    import EditTransactionModal from './EditTransactionModal.svelte';

	export let data;
</script>

<div class="container">
	<AddTransaction />
	<TransactionList {data} />
	<RecurringTransactionList {data} />

    <EditTransactionModal />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	@media (min-width: 1560px) {
		.container {
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
