<script>
	import Header from './Header.svelte';
    import Footer from './Footer.svelte';
	import '$lib/reset.css';
	import '$lib/global-styles.css';
</script>

<Header />
<main>
	<slot></slot>
</main>
<Footer />

<style>
	:root {
		font-family: 'Noto Sans', sans-serif;
	}

	main {
		margin: 1rem;
	}
</style>
