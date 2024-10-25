<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { parseInput, analyzeScenario } from '$lib/playing-partitions';

	let inputText = `2 1
3
---
3 2 1
2 2 1 1`;
	let outputText = '';

	function analyzeGame() {
		try {
			const scenarios = parseInput(inputText);
			const output: string[] = [];

			scenarios.forEach((scenario, index) => {
				// Base partition
				output.push(scenario.base.join(' '));
				output.push('');

				// Target partitions
				scenario.targets.forEach((target) => {
					output.push(target.join(' '));
				});

				// Result
				const result = analyzeScenario(scenario);
				output.push(`# ${result}`);

				if (index < scenarios.length - 1) {
					output.push('---');
				}
			});

			outputText = output.join('\n');
		} catch (error) {
			outputText = 'Error: Invalid input format';
		}
	}
</script>

<EtudeDoc
	title="Playing Partitions"
	description="Analyze a two-player game involving Ferrers boards and target positions to determine the outcome (win, lose, or draw) from a given starting position."
>
	<EtudeSection title="Game Analysis">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<div class="control-section">
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter starting position and target positions..."
						rows="10"
						spellcheck="false"
					/>
					<div class="button-container">
						<button class="game-button" on:click={analyzeGame}>Analyze Game</button>
					</div>
				</div>
			</EtudeCard>

			<EtudeCard title="Result">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Guide">
		<div class="etude-grid">
			<EtudeCard title="Input Format">
				<pre class="etude-pre">2 1     # Starting position
3       # Empty line separator
        # Target positions below</pre>
				<ul class="etude-list">
					<li>First line: Starting position</li>
					<li>Blank line separator</li>
					<li>Remaining lines: Target positions</li>
					<li>Use "---" to separate scenarios</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Game Rules">
				<ul class="etude-list">
					<li>Two players take turns making moves</li>
					<li>A move converts a column into a row</li>
					<li>First to reach a target position wins</li>
					<li>Game is drawn if neither can force a win</li>
					<li>Analysis assumes optimal play by both players</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.control-section {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.input-field {
		width: 100%;
		font-family: monospace;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}

	.button-container {
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

	.game-button:hover {
		background: #f0f0f0;
	}
</style>
