<script>
	let transactionTypes = [
		{
			id: 'withdrawal',
			name: 'Withdrawal'
		},
		{
			id: 'deposit',
			name: 'Deposit'
		}
	];

	let selectedTransactionType = 'withdrawal';
	let description;
	let monthly = false;
	let amount;
	let newStartingBalance = false;

	let open = true;
	let hideElement = true;
</script>

<div class="container">
	<aside class:open>
		<form method="POST" action="?/create" class="nb-card">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h2 on:click={() => (hideElement = !hideElement)}>Add Transaction</h2>
			<label for="date" class:hideElement
				>Date:
				<input type="date" name="date" id="date"/>
			</label>
			<label for="type" class:hideElement
				>Type:
				<select name="type" id="type" bind:value={selectedTransactionType}>
					{#each transactionTypes as transactionType}
						<option value={transactionType.id}>
							{transactionType.name}
						</option>
					{/each}
				</select>
			</label>
			<label for="description" class:hideElement
				>Description:
				<input type="text" name="description" id="description" size="14" bind:value={description} />
			</label>
			<label for="recurring-monthly" class:hideElement
				>New Starting Balance:
				<input
					type="checkbox"
					name="new-starting-balance"
					id="new-starting-balance"
					bind:checked={newStartingBalance}
				/>
			</label>
			<label for="recurring-monthly" class:hideElement
				>Monthly:
				<input
					type="checkbox"
					name="recurring-monthly"
					id="recurring-monthly"
					bind:checked={monthly}
				/>
			</label>
			<label for="amount" class:hideElement
				>Amount:
				<input
					type="text"
					name="amount"
					id="amount"
					placeholder="$0.00"
					size="14"
					bind:value={amount}
				/>
			</label>

			<button type="submit" class="submit-button nb-card" class:hideElement>Submit</button>
		</form>
	</aside>
	<!-- <button on:click={() => (open = !open)} class="show-hide">New Transaction</button> -->
</div>

<style>
	.container {
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		grid-column: 1 / 2;
		width: fit-content;
		text-wrap: nowrap;
	}

	.open {
		left: 0;
	}

	.hideElement {
		display: none;
	}

	aside {
		font-size: 1.125rem;
		left: -100%;
		transition: left 0.3s ease-in-out;
		position: relative;
		margin-bottom: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: flex-start;
		gap: 0px;
		line-height: 2rem;
		padding: 1rem;
		background-color: white;
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
		/* border-radius: 0.25rem; */
		/* border-color: transparent; */
	}

	.submit-button {
		background-color: #15803d;
		margin: 1rem 0;
	}

	.submit-button:hover {
		background-color: #166534;
	}

	.show-hide {
		background-color: #264653;
		display: block;
		position: fixed;
	}

	.show-hide:hover {
		background-color: #264653bd;
	}

	input[type='checkbox'] {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
