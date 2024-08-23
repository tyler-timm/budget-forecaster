<script>
    import Signout from '$lib/components/Signout.svelte';
</script>

<div class="container">
	<div class="inner-container">
		<img src="./flying-piggy-bank.png" alt="flying piggy bank" width="90" height="90" />
		<h1>Budget Forecaster</h1>
        <Signout />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		top: 0px;
		position: fixed;
		width: 100%;
		z-index: 20;
        background-color: #264653;
	}

	.inner-container {
		display: flex;
		align-items: center;
	}

	h1 {
		font-family: 'Noto Sans', sans-serif;
		font-size: 3rem;
		line-height: 1;
		font-weight: 700;
		padding: 1.25rem;
		color: #eab308;
	}

    img {
        display: inline;
    }
</style>
