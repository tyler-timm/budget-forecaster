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

	let selectedTransactionType = 'deposit';
	let description;
	let monthly = false;
	let amount;
</script>

<div class="container">
	<aside>
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
    
            <button type="submit">Submit</button>
		</form>
	</aside>
</div>

<style>
	.container {
		margin-top: 6rem;
		margin-left: 1.5rem;
	}

	aside {
		width: 26rem;
		font-size: 1.125rem;
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
		margin-bottom: 0.25rem;
		margin-top: 0.25rem;
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
		background-color: #15803d;
		color: white;
		padding: 0.25rem 0.5rem;
		margin: 1rem 0;
		border-radius: 0.25rem;
		border-color: transparent;
		font-size: 1rem;
	}

	button:hover {
		background-color: #166534;
	}

	input[type='checkbox'] {
		width: 1.5rem;
		height: 1.5rem;
	}

	@media (min-width: 1280px) {
		aside {
			position: fixed;
		}
	}
</style>
