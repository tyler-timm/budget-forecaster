<script>
	import Signout from './Signout.svelte';
</script>

<div class="container">
	<div class="inner-container">
		<img src="./flying-piggy-bank.png" alt="flying piggy bank" width="60" height="60" />
		<h1>Budget Forecaster</h1>
		<Signout />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		top: 0px;
		position: fixed;
		width: 100%;
		z-index: 20;
		background-color: #264653;
	}

	.inner-container {
		display: flex;
		align-items: center;
		margin-left: 2rem;
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

	img {
		display: inline;
	}
</style>
