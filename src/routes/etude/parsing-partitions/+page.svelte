<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';

	let inputText = `1 1 1
3
---
2 2
1 1 1 1`;
	let outputText = '';

	interface ValidationResult {
		isValid: boolean;
		message: string;
	}

	function validateLine(line: string): ValidationResult {
		// Skip empty lines or comment lines
		if (line.trim() === '' || line.startsWith('#')) {
			return { isValid: true, message: line };
		}

		// Check if it's a separator line
		if (line.trim().replace(/[-]/g, '') === '') {
			return { isValid: true, message: '---' };
		}

		// Validate partition format (numbers separated by spaces)
		const numbers = line.trim().split(/\s+/).map(Number);
		if (numbers.some(isNaN)) {
			return {
				isValid: false,
				message: `# INVALID: ${line}\n#   REASON: Line contains non-numeric values`
			};
		}

		// Check if numbers are in descending order
		for (let i = 1; i < numbers.length; i++) {
			if (numbers[i] > numbers[i - 1]) {
				return {
					isValid: false,
					message: `# INVALID: ${line}\n#   REASON: Partition numbers must be in descending order`
				};
			}
		}

		return { isValid: true, message: numbers.join(' ') };
	}

	// Removed unused getPartition function

	function getScenarioPartitions(lines: string[]): number[][] {
		const partitions: number[][] = [];
		let currentPartition: number[] = [];

		for (const line of lines) {
			if (line.trim() === '' || line.startsWith('#')) {
				continue;
			}

			if (line.trim().replace(/[-]/g, '') === '') {
				if (currentPartition.length > 0) {
					partitions.push(currentPartition);
					currentPartition = [];
				}
				continue;
			}

			const numbers = line
				.trim()
				.split(/\s+/)
				.map(Number)
				.filter((n) => !isNaN(n));

			if (numbers.length > 0) {
				currentPartition = numbers;
			}
		}

		if (currentPartition.length > 0) {
			partitions.push(currentPartition);
		}

		return partitions;
	}

	// ... [rest of the utility functions remain the same]

	function parsePartitions() {
		const lines = inputText.split('\n');
		let output: string[] = [];
		let scenarios = [];
		let currentScenario: string[] = [];

		for (let line of lines) {
			const result = validateLine(line);

			if (line.trim().replace(/[-]/g, '') === '') {
				if (currentScenario.length > 0) {
					scenarios.push(currentScenario);
				}
				currentScenario = [];
				continue;
			}

			if (result.isValid) {
				if (!line.startsWith('#') && line.trim() !== '') {
					currentScenario.push(result.message);
				}
			} else {
				currentScenario.push(result.message);
			}
		}

		if (currentScenario.length > 0) {
			scenarios.push(currentScenario);
		}

		// Process each scenario
		for (let scenario of scenarios) {
			const partitions = getScenarioPartitions(scenario);
			const validation = validateScenario(partitions);

			if (!validation.isValid) {
				output.push(validation.message);
				output.push(partitionToString(partitions[0]));
				if (partitions.length > 1) {
					output.push(partitionToString(partitions[1]));
				}
			} else {
				const moveResult = movesRequired(partitions[0], partitions[1]);
				output.push(moveResult.message);
				output.push(partitionToString(partitions[0]));

				if (moveResult.isValid) {
					const path = getMovePath(partitions[0], partitions[1]);
					output.push(...path);
				}

				output.push(partitionToString(partitions[1]));
			}

			if (scenario !== scenarios[scenarios.length - 1]) {
				output.push('---');
			}
		}

		outputText = output.join('\n');
	}
</script>

<EtudeDoc
	title="Parsing Partitions"
	description="Identify, validate, and standardize the format of integer partition data from text files containing various types of content."
>
	<EtudeSection title="Partition Parser">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<p class="etude-info">
					Enter partition data below. Each partition should be a sequence of numbers in descending
					order. Use "---" to separate scenarios.
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
			<EtudeCard title="Valid Format">
				<pre class="etude-pre">1 1 1
3
---
2 2
1 1 1 1</pre>
				<ul class="etude-list">
					<li>Numbers must be space-separated</li>
					<li>Each line represents one partition</li>
					<li>Numbers must be in descending order</li>
					<li>Use "---" to separate different scenarios</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Validation Rules">
				<ul class="etude-list">
					<li>All values must be valid numbers</li>
					<li>Numbers in each partition must be in descending order</li>
					<li>Each scenario must contain exactly two partitions</li>
					<li>Both partitions in a scenario must sum to the same value</li>
					<li>Empty lines and comments (starting with #) are ignored</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>
