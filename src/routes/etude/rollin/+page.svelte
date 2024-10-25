<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { onMount } from 'svelte';
	import { handleRoll, isComplete } from '$lib/rollin';

	let currentDice = Array(6).fill(0);
	let rolls = [];
	let gameComplete = false;

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

<EtudeDoc
	title="Rollin'"
	description="Form two sets of three dice where each set is either three of a kind or a sequence of three consecutive numbers."
>
	<EtudeSection title="Game Board">
		<div class="etude-grid-narrow">
			<EtudeCard title="Controls">
				<div class="control-buttons">
					<button class="game-button" on:click={rollDie} disabled={gameComplete}>Roll</button>
					<button class="game-button" on:click={reset}>Reset</button>
				</div>
			</EtudeCard>

			<EtudeCard title="Current Dice">
				<div class="dice-row">
					{#each currentDice as die}
						<div class="die">{die}</div>
					{/each}
				</div>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="History">
		<EtudeCard title="Rolls History">
			<table class="history-table">
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
								<div class="dice-row small">
									{#each diceAfter as die}
										<div class="die small">{die}</div>
									{/each}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</EtudeCard>
	</EtudeSection>

	<EtudeSection title="Rules">
		<div class="etude-grid">
			<EtudeCard title="Winning Conditions">
				<ul class="etude-list">
					<li>Form two sets of three dice each</li>
					<li>
						Each set must be either:
						<ul>
							<li>Three of a kind (e.g., 4-4-4)</li>
							<li>Three consecutive numbers (e.g., 3-4-5)</li>
						</ul>
					</li>
					<li>All six dice must be used</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Game Flow">
				<ul class="etude-list">
					<li>Click 'Roll' to get a new die</li>
					<li>The AI will choose which die to replace</li>
					<li>Try to complete both sets in minimal rolls</li>
					<li>Use 'Reset' to start a new game</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.control-buttons {
		display: flex;
		gap: 10px;
	}

	.game-button {
		padding: 10px 20px;
		cursor: pointer;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1em;
	}

	.game-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.game-button:hover:not(:disabled) {
		background: #f0f0f0;
	}

	.dice-row {
		display: flex;
		gap: 10px;
		justify-content: center;
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
		background: white;
	}

	.die.small {
		width: 24px;
		height: 24px;
		border-width: 1px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.history-table {
		width: 100%;
		border-collapse: collapse;
	}

	.history-table th,
	.history-table td {
		padding: 10px;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	.history-table tr.complete {
		background: #e6ffe6;
	}
</style>
