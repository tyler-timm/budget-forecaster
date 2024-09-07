<script>
	import Header from './Header.svelte';
    import '$lib/reset.css';
    import '$lib/global-styles.css';
</script>

<Header />
<main>
	<slot></slot>
</main>

<style>
	:root {
		font-family: 'Noto Sans', sans-serif;
	}

    main {
        margin: 1rem;
    }
</style>
