<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';
	import RecurringTransactionList from './RecurringTransactionList.svelte';

	export let data;
    export let open = false;
</script>

<AddTransaction {open}/>
<button on:click={() => open = !open}>
    {#if open}
        Close
    {:else}
        Open
    {/if}
</button>
<RecurringTransactionList {data} />
<TransactionList {data} />
