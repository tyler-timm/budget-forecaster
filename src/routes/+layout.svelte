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
		background-color: #264653;
		color: #fff;
		font-family: 'Noto Sans', sans-serif;
	}
</style>
