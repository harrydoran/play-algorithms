<script lang="ts">
	import { onMount } from 'svelte';
	import { handleRoll, isComplete } from '$lib/rollin';

	// Game state
	let currentDice = Array(6).fill(0);
	let rolls: { roll: number; diceAfter: number[]; replaced: number }[] = [];
	let gameComplete = false;

	// Initialize with random dice
	onMount(() => {
		currentDice = Array(6)
			.fill(0)
			.map(() => Math.floor(Math.random() * 6) + 1);
		rolls = [];
	});

	function rollDie() {
		const roll = Math.floor(Math.random() * 6) + 1;
		const bestMove = handleRoll(roll, [...currentDice]);

		if (bestMove >= 0 && bestMove < 6) {
			const newDice = [...currentDice];
			newDice[bestMove] = roll;
			currentDice = newDice;
			rolls = [...rolls, { roll, diceAfter: [...newDice], replaced: bestMove }];
			gameComplete = isComplete(currentDice);
		}
	}

	function reset() {
		currentDice = Array(6)
			.fill(0)
			.map(() => Math.floor(Math.random() * 6) + 1);
		rolls = [];
		gameComplete = false;
	}
</script>

<svelte:head>
	<title>Rollin' - Play Algorithms</title>
</svelte:head>

<div class="container">
	<h1>Rollin'</h1>
	<p class="description">
		Form two sets of three dice where each set is either three of a kind or a sequence of three
		consecutive numbers.
	</p>

	<div class="game-container">
		<div class="controls">
			<button on:click={rollDie} disabled={gameComplete}>Roll</button>
			<button on:click={reset}>Reset</button>
		</div>

		<div class="current-dice">
			<h3>Current Dice</h3>
			<div class="dice-row">
				{#each currentDice as die, i}
					<div class="die">{die}</div>
				{/each}
			</div>
		</div>

		<div class="rolls-table">
			<h3>Rolls History</h3>
			<table>
				<thead>
					<tr>
						<th>Roll</th>
						<th>Replaced</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>
					{#each rolls as { roll, diceAfter, replaced }}
						<tr class={isComplete(diceAfter) ? 'complete' : ''}>
							<td>{roll}</td>
							<td>{replaced + 1}</td>
							<td>
								{#each diceAfter as die}
									<span class="die-small">{die}</span>
								{/each}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.description {
		color: #666;
		margin-bottom: 20px;
	}

	.game-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.controls {
		display: flex;
		gap: 10px;
	}

	button {
		padding: 10px 20px;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.current-dice {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.dice-row {
		display: flex;
		gap: 10px;
	}

	.die {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #333;
		border-radius: 8px;
		font-weight: bold;
	}

	.die-small {
		width: 24px;
		height: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #333;
		border-radius: 4px;
		margin-right: 4px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
	}

	th,
	td {
		padding: 10px;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	tr.complete {
		background: #e6ffe6;
	}
</style>
