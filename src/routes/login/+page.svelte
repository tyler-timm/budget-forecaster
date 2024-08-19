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
    }
</style>
