<script>
	import 'iconify-icon';
</script>

<footer>
	<ul>
		<li>
			<span class="author">Tyler Timm</span>
		</li>
		<li>
			<iconify-icon icon="ri:svelte-fill" />
		</li>
		<li>
			<iconify-icon icon="simple-icons:lucia" />
		</li>
		<li>
			<iconify-icon icon="simple-icons:iconify" />
		</li>
	</ul>
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		background-color: #264653;
	}

	ul {
		display: flex;
		gap: 1.5rem;
	}

	li {
		list-style-type: none;
		color: #eab308;
		font-size: 2rem;
	}

	iconify-icon {
		padding-top: 0.5rem;
	}

	.author {
		font-size: 1.5rem;
	}

	@media (min-width: 620px) {
	}

	@media (min-width: 915px) {
		ul {
			margin-top: 1rem;
			margin-bottom: 1rem;
		}
	}
</style>
