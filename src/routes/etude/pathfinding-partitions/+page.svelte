<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { parseInput, movesToComplete, formatPartition } from '$lib/pathfinding';

	let inputText = `1 1 1
3
---
2 2
1 1 1 1`;
	let outputText = '';

	function processPartitions() {
		const scenarios = parseInput(inputText);
		const output = [];

		scenarios.forEach((scenario, index) => {
			const result = movesToComplete(scenario.basePartition, scenario.targetPartition);

			if (!result) {
				output.push('# No solution possible');
				output.push(formatPartition(scenario.basePartition));
				output.push(formatPartition(scenario.targetPartition));
			} else {
				output.push(`# Moves required: ${result.count}`);
				result.steps.forEach((step) => {
					output.push(formatPartition(step));
				});
			}

			if (index < scenarios.length - 1) {
				output.push('---');
			}
		});

		outputText = output.join('\n');
	}
</script>

<EtudeDoc
	title="Pathfinding Partitions"
	description="Find the shortest sequence of transformations to change one integer partition into another using column to row moves."
>
	<EtudeSection title="Partition Pathfinder">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<div class="control-section">
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter partitions..."
						rows="10"
						spellcheck="false"
					/>
					<div class="button-container">
						<button class="game-button" on:click={processPartitions}>Find Path</button>
					</div>
				</div>
			</EtudeCard>

			<EtudeCard title="Output">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Guide">
		<div class="etude-grid">
			<EtudeCard title="Input Format">
				<pre class="etude-pre">1 1 1
3
---
2 2
1 1 1 1</pre>
				<ul class="etude-list">
					<li>First line: Initial partition</li>
					<li>Second line: Target partition</li>
					<li>Use "---" to separate scenarios</li>
					<li>Numbers must be in descending order</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Rules">
				<h4>Valid Moves</h4>
				<ul class="etude-list">
					<li>Select any column from the partition</li>
					<li>Remove the selected column</li>
					<li>Add a new row with the same length</li>
					<li>Partitions must sum to the same value</li>
					<li>All intermediate steps must be valid partitions</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.control-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
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

	h4 {
		margin: 0 0 10px 0;
		color: #555;
		font-size: 1.1em;
	}
</style>
