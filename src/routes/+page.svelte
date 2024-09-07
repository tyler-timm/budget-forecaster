<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';
	import RecurringTransactionList from './RecurringTransactionList.svelte';

	export let data;
	export let open = true;
</script>

<div class="container">
	<button on:click={() => (open = !open)}>
		{#if open}
			Hide
		{:else}
			Show
		{/if}
	</button>
	<AddTransaction {open} />
	<TransactionList {data} />
	<RecurringTransactionList {data} />
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

	button {
		position: fixed;
		top: 5rem;
	}
</style>
