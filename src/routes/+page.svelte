<script>
	import AddTransaction from './AddTransaction.svelte';
	import TransactionList from './TransactionList.svelte';

	export let data;
</script>

<div class="container">
	<AddTransaction />
	<TransactionList {data} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	@media (min-width: 1560px) {
		.container {
			flex-direction: row;
			justify-content: center;
		}
	}
</style>
