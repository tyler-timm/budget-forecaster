<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';
	import Header from './Header.svelte';

	export let data;
</script>

<div class="container">
    <AddTransaction />
	<TransactionList {data} />
</div>

<style>
	.container {
		display: grid;
	}

	@media (min-width: 1080px) {
		.container {
			grid-template-columns: auto 1fr;
		}
	}
</style>
