<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { validateAllLines, CONSTANTS } from '$lib/parsing-partitions';

	let inputText = `1 1 1
3
---
2 2
1 1 1 1`;
	let outputText = '';

	function parsePartitions() {
		try {
			const scenarios = validateAllLines(inputText);
			const output = [];

			scenarios.forEach((scenario, index) => {
				if (!scenario.valid) {
					output.push(CONSTANTS.INVALID_SCENARIO_MESSAGE);
				}
				output.push(...scenario.lines);

				if (index < scenarios.length - 1) {
					output.push(CONSTANTS.SEPARATOR_STRING);
				}
			});

			outputText = output.join('\n');
		} catch (error) {
			outputText = `Error processing input: ${error.message}`;
		}
	}
</script>

<EtudeDoc
	title="Parsing Partitions"
	description="Parse and validate integer partition data with support for various formats and comprehensive error handling."
>
	<EtudeSection title="Partition Parser">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<p class="etude-info">
					Enter partition data using either spaces or commas as delimiters. Numbers must be in
					descending order. Use "---" to separate scenarios.
				</p>
				<textarea
					class="etude-input"
					bind:value={inputText}
					placeholder="Enter partitions..."
					rows="10"
					spellcheck="false"
				/>
				<button class="etude-button" on:click={parsePartitions}>Parse Partitions</button>
			</EtudeCard>

			<EtudeCard title="Output">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Format Guide">
		<div class="etude-grid">
			<EtudeCard title="Valid Formats">
				<pre class="etude-pre">3 2 1
5,4,3
---
2 2
1 1 1 1</pre>
				<ul class="etude-list">
					<li>Space-separated numbers: "3 2 1"</li>
					<li>Comma-separated numbers: "3,2,1"</li>
					<li>Single numbers: "5"</li>
					<li>Comments starting with #</li>
					<li>Scenario separators: "---" or more dashes</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Validation Rules">
				<ul class="etude-list">
					<li>Numbers must be valid integers</li>
					<li>Numbers must be in descending order</li>
					<li>No mixing of delimiters (spaces and commas)</li>
					<li>Comments must start at beginning of line</li>
					<li>Separators must have at least 3 dashes</li>
					<li>Empty lines are compressed</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.etude-input {
		width: 100%;
		font-family: monospace;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}

	.etude-button {
		margin-top: 10px;
		padding: 8px 16px;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
	}

	.etude-button:hover {
		background: #f0f0f0;
	}

	.etude-info {
		margin-bottom: 10px;
		color: #666;
	}

	:global(.etude-pre) {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: monospace;
		background: #f8f8f8;
		padding: 10px;
		border-radius: 4px;
		margin: 0;
	}

	:global(.etude-list) {
		list-style-type: disc;
		padding-left: 20px;
		margin: 0;
	}

	:global(.etude-list li) {
		margin-bottom: 8px;
		color: #666;
	}
</style>
