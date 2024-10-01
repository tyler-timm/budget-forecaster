<script>
	import Signout from './Signout.svelte';
</script>

<header>
	<div class="header-left">
		<img src="./flying-piggy-bank.png" alt="flying piggy bank" width="60" height="60" />
		<h1>Budget Forecaster</h1>
		<nav class="fullscreen-nav">
			<a href="/">Home</a>
			<a href="/recurring">Recurring Transactions</a>
		</nav>
	</div>
	<Signout />
</header>
<nav class="mobile-nav">
    <a href="/">Home</a>
    <a href="/recurring">Recurring Transactions</a>
</nav>

<style>
	header {
		display: flex;
		position: sticky;
		align-items: center;
		z-index: 20;
		background-color: #264653;
		justify-content: space-between;
        padding-left: 1rem;
        padding-right: 1rem;
	}

	.header-left {
		display: flex;
		align-items: center;
		margin-left: 2rem;
	}

	.fullscreen-nav {
		display: none;
	}

	.mobile-nav {
		padding: 1rem;
		background-color: #264653;
	}

	a {
		/* font-family: 'Noto Sans', sans-serif; */
		font-size: 1.2rem;
		line-height: 1;
		font-weight: 700;
		padding: 1.25rem;
		color: #eab308;
		text-decoration: none;
	}

	h1 {
		/* font-family: 'Noto Sans', sans-serif; */
		font-size: 1.6rem;
		font-weight: 700;
		padding: 1.25rem;
		color: #eab308;
	}

	@media (min-width: 620px) {
		h1 {
			/* font-family: 'Noto Sans', sans-serif; */
			font-size: 2rem;
			line-height: 1;
			font-weight: 700;
			padding: 1.25rem;
			color: #eab308;
		}
	}

	@media (min-width: 915px) {
		.fullscreen-nav {
			display: block;
		}

		.mobile-nav {
			display: none;
		}

		a {
			font-size: 1.5rem;
		}
	}

	img {
		display: inline;
	}
</style>
