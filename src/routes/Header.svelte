<script>
	import Signout from './Signout.svelte';
</script>

<header>
	<div class="header-left">
		<img src="./flying-piggy-bank.png" alt="flying piggy bank" width="60" height="60" />
		<h1>Budget Forecaster</h1>
		<nav class="fullscreen-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/recurring">Recurring Transactions</a></li>
				<li><a href="/tech">Tech</a></li>
			</ul>
		</nav>
	</div>
	<Signout />
</header>
<nav class="mobile-nav">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/recurring">Recurring Transactions</a></li>
		<li><a href="/tech">Tech</a></li>
	</ul>
</nav>

<style>
	header {
		display: flex;
		position: sticky;
		align-items: center;
		top: 0;
		z-index: 20;
		background-color: #264653;
		justify-content: space-between;
		width: 99vw;
	}

	nav {
		background-color: #264653;
	}

	a {
		/* font-family: 'Noto Sans', sans-serif; */
		font-size: 1.2rem;
		font-weight: 700;
		color: #eab308;
		text-decoration: none;
	}

	a:hover {
		/* border: 3px solid #eab308; */
		background-color: #213d49;
		border-radius: 20px;
		text-decoration: underline;
	}

	li {
		list-style-type: none;
	}

	h1 {
		/* font-family: 'Noto Sans', sans-serif; */
		font-size: 1.6rem;
		font-weight: 700;
		padding: 1.25rem;
		color: #eab308;
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
		padding-bottom: 1rem;
		background-color: #264653;
		display: flex;
		flex-direction: column;
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
		header {
			padding-left: 1rem;
			padding-right: 1rem;
		}

		ul {
			display: flex;
			flex-direction: row;
		}

		a {
			font-size: 1.5rem;
			padding: 1.25rem;
		}

		.fullscreen-nav {
			display: block;
		}

		.mobile-nav {
			display: none;
		}
	}
</style>
