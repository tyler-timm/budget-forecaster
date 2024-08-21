<script>
	import { enhance } from '$app/forms';
</script>

<div class="container">
	<h1>Sign in</h1>
	<form method="post" use:enhance>
		<label for="username">Username</label>
		<input name="username" id="username" /><br />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" /><br />
		<button>Continue</button>
	</form>
</div>

<style>
	.container {
		margin-top: 6rem;
        margin-left: 2.5rem;
	}

    input,
	select {
		padding: 0.25rem;
		border-width: 1px;
		color: black;
		border-radius: 0.25rem;
		margin: 0.5rem;
        font-size: 1.25rem;
	}

    label {
        font-size: 1.25rem;
    }

    button {
		background-color: #1e1ee9;
        color: white;
		padding: .5rem .75rem;
		border-radius: 0.25rem;
        border: none;
        font-size: 1rem;
	}

	button:hover {
		background-color: #1b1bcc;
	}
</style>
