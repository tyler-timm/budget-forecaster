<script>
	import { enhance } from '$app/forms';
</script>

<form method="post" action="?/signout" use:enhance>
	<button>Sign out</button>
</form>

<style>
	button {
		background-color: #1744d8;
		color: white;
		line-height: 2rem;
		padding: 0.25rem 0.5rem;
        margin-right: 1rem;
		border-radius: 0.25rem;
		border: none;
		font-size: 1rem;
        width: 75px;
	}

	button:hover {
		background-color: #1441bb;
	}
</style>
