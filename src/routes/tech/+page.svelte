<script>
	import 'iconify-icon';
</script>

<div class="center">
	<div class="list">
		<h2>Tech Used</h2>
		<ul>
			<li>
				<a href="https://svelte.dev/">
					<iconify-icon icon="ri:svelte-fill"></iconify-icon> Svelte + SvelteKit</a
				>
			</li>
			<li>
				<a href="https://lucia-auth.com/"
					><iconify-icon icon="simple-icons:lucia"></iconify-icon> Lucia</a
				>
			</li>
			<li>
				<a href="https://iconify.design/"
					><iconify-icon icon="simple-icons:iconify"></iconify-icon> Iconify</a
				>
			</li>
		</ul>
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
	}

	h2 {
		font-size: 2rem;
	}

	ul {
		list-style-type: none;
		font-size: 1.5rem;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	a:visited {
		color: #000;
	}
</style>
