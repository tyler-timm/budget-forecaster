<script>
	import { enhance } from '$app/forms';
	export let showModal; // boolean

	let dialog; // HTMLDialogElement
	$: if (dialog && showModal) dialog.showModal();

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

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="container">
	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<form method="POST" action="?/edit" class="card-shadow" use:enhance>
			<h2>Edit Transaction</h2>
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

			<button type="submit" class="submit-button">Submit</button>
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog.close()}>Close</button>
		</form>
	</dialog>
</div>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
	}

	.container {
        position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
</style>
