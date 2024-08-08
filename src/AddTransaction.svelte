<script>
	let transactionTypes = [
		{
			id: 1,
			name: 'Deposit'
		},
		{
			id: 2,
			name: 'Withdrawal'
		}
	];

	let selectedTransactionType;

	const today = new Date();
	let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	let description;
	let monthly = false;
	let amount;
</script>

<div class="container">
	<h2>Add Transaction</h2>

	<aside>
		<form>
			<label for="date"
				>Date:
				<input type="date" name="date" id="date" bind:value={date} />
			</label>
			<label for="type"
				>Type:
				<select name="type" id="type" bind:value={selectedTransactionType}>
					{#each transactionTypes as transactionType}
						<option value={transactionType}>
							{transactionType.name}
						</option>
					{/each}
				</select>
			</label>
			<label for="description"
				>Description:
				<input
					type="text"
					name="description"
					id="description"
					placeholder="Description"
					bind:value={description}
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

			<button type="submit"> Submit </button>
		</form>
	</aside>
</div>

<style>
	.container {
		margin-top: 8rem;
		margin-left: 2.5rem;
	}

	aside {
		width: 24rem;
		font-size: 1.25rem;
		line-height: 1.5rem;
		margin-top: 3.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: flex-start;
		gap: 0px;
	}

	input,
	select {
		padding: 0.25rem;
		border-width: 1px;
		color: black;
		border-radius: 0.25rem;
		margin: 0.5rem;
	}

	button {
		background-color: #15803d;
		padding: 0.25rem 0.5rem;
		margin: 1rem 0;
		border-radius: 0.25rem;
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
