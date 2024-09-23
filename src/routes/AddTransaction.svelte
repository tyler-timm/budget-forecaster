<script>
	import { enhance } from '$app/forms';

	let transactionTypes = [
		{
			id: 'deposit',
			name: 'Deposit'
		},
		{
			id: 'withdrawal',
			name: 'Withdrawal'
		}
	];

	let selectedTransactionType = 'withdrawal';
	let description;
	let monthly = false;
	let amount;
    let newStartingBalance = false;

	let open = true;
</script>

<div class="container">
	<div class="inner-container">
		<button on:click={() => (open = !open)} class="show-hide"> Show/Hide </button>
		<aside class:open>
			<form method="POST" action="?/create" class="card-shadow" use:enhance>
				<h2>Add Transaction</h2>
				<label for="date"
					>Date:
					<input type="date" name="date" id="date" />
				</label>
				<label for="type"
					>Type:
					<select name="type" id="type" bind:value={selectedTransactionType}>
						{#each transactionTypes as transactionType}
							<option value={transactionType.id}>
								{transactionType.name}
							</option>
						{/each}
					</select>
				</label>
				<label for="description"
					>Description:
					<input type="text" name="description" id="description" bind:value={description} />
				</label>
				<label for="recurring-monthly"
					>New Starting Balance:
					<input
						type="checkbox"
						name="new-starting-balance"
						id="new-starting-balance"
						bind:checked={newStartingBalance}
					/>
				</label>
				<label for="recurring-monthly"
					>Monthly:
					<input
						type="checkbox"
						name="recurring-monthly"
						id="recurring-monthly"
						bind:checked={monthly}
					/>
				</label>
				<label for="amount"
					>Amount:
					<input type="text" name="amount" id="amount" placeholder="$0.00" bind:value={amount} />
				</label>

				<button type="submit" class="submit-button">Submit</button>
			</form>
		</aside>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.inner-container {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	.open {
		left: 1rem;
	}

	aside {
		font-size: 1.125rem;
		left: -100%;
		transition: left 0.3s ease-in-out;
		margin-top: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: flex-start;
		gap: 0px;
		line-height: 2rem;
		/* border: 1px solid white; */
		border-radius: 1rem;
		padding: 1rem;
		background-color: white;
		margin-top: 1rem;
	}

	h2 {
		color: #000;
		font-weight: 700;
		font-size: 1.5rem;
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
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border-color: transparent;
	}

	.submit-button {
		background-color: #15803d;
		margin: 1rem 0;
	}

	.submit-button:hover {
		background-color: #166534;
	}

	.show-hide {
		background-color: lightgrey;
		color: white;
		padding: 0.25rem 0.5rem;
		border-color: transparent;
		display: none;
	}

	.show-hide:hover {
		background-color: grey;
	}

	input[type='checkbox'] {
		width: 1.5rem;
		height: 1.5rem;
	}

	@media (min-width: 1560px) {
		aside {
			position: fixed;
		}

		.show-hide {
			display: block;
			position: fixed;
		}
	}
</style>
