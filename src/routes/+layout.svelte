<script>
	import Header from '$lib/components/Header.svelte';
    import '$lib/reset.css';
</script>

<Header />
<main>
	<slot></slot>
</main>

<style>
	:root {
		background-color: #E1E1E1;
		/* color: #fff; */
		font-family: 'Noto Sans', sans-serif;
	}
</style>
