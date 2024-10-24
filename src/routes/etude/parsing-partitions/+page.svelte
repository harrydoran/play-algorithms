<script lang="ts">
	type Partition = number[];
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

	function getPartition(line: string): number[] {
		return line
			.trim()
			.split(/\s+/)
			.map((n) => parseInt(n));
	}

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

	function validateScenario(partitions: number[][]): ValidationResult {
		if (partitions.length !== 2) {
			return {
				isValid: false,
				message: '# INVALID: Scenario must contain exactly two partitions'
			};
		}

		const sum1 = partitions[0].reduce((a, b) => a + b, 0);
		const sum2 = partitions[1].reduce((a, b) => a + b, 0);

		if (sum1 !== sum2) {
			return {
				isValid: false,
				message: '# INVALID: Partitions must sum to the same value'
			};
		}

		return {
			isValid: true,
			message: ''
		};
	}

	function partitionToString(partition: number[]): string {
		return partition.join(' ');
	}

	function movesRequired(start: number[], end: number[]): ValidationResult {
		const sum1 = start.reduce((a, b) => a + b, 0);
		const sum2 = end.reduce((a, b) => a + b, 0);

		if (sum1 !== sum2) {
			return {
				isValid: false,
				message: '# No solution possible'
			};
		}

		// Count number of moves needed
		let moves = 0;
		let current = [...start];

		while (!arraysEqual(current, end)) {
			// Find column that can be moved
			let found = false;
			for (let i = 0; i < current.length; i++) {
				if (current[i] > (end[i] || 0)) {
					// Move extra from this column to a new row
					const diff = current[i] - (end[i] || 0);
					current[i] -= diff;
					current.push(diff);
					current.sort((a, b) => b - a); // Keep descending order
					moves++;
					found = true;
					break;
				}
			}

			if (!found) {
				return {
					isValid: false,
					message: '# No solution possible'
				};
			}
		}

		return {
			isValid: true,
			message: `# Moves required: ${moves}`
		};
	}

	function arraysEqual(a: number[], b: number[]): boolean {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	function getMovePath(start: number[], end: number[]): string[] {
		const path: string[] = [];
		let current = [...start];

		while (!arraysEqual(current, end)) {
			// Find column that can be moved
			for (let i = 0; i < current.length; i++) {
				if (current[i] > (end[i] || 0)) {
					// Move extra from this column to a new row
					const diff = current[i] - (end[i] || 0);
					current[i] -= diff;
					current.push(diff);
					current.sort((a, b) => b - a);
					path.push(partitionToString(current));
					break;
				}
			}
		}

		return path;
	}

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

<svelte:head>
	<title>Parsing Partitions - Play Algorithms</title>
</svelte:head>

<div class="container">
	<h1>Parsing Partitions</h1>
	<p class="instructions">
		Enter partition data below. Each partition should be a sequence of numbers in descending order.
		Use "---" to separate scenarios.
	</p>
	<div class="partition-app">
		<div class="controls">
			<textarea bind:value={inputText} placeholder="Enter partitions..." rows="10"></textarea>
			<button on:click={parsePartitions}>Parse</button>
		</div>

		<div class="output">
			<pre>{outputText}</pre>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		color: #333;
		margin-bottom: 10px;
	}

	.instructions {
		color: #666;
		margin-bottom: 20px;
	}

	.partition-app {
		display: flex;
		gap: 20px;
		padding: 20px;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	textarea {
		width: 300px;
		font-family: monospace;
		padding: 10px;
	}

	.output {
		flex: 1;
		font-family: monospace;
		background: white;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		min-height: 200px;
		white-space: pre-wrap;
	}

	button {
		padding: 10px;
		cursor: pointer;
	}
</style>
