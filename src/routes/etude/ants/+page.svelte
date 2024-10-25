<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import SpecButton from '../../../components/SpecButton.svelte';
	import { onMount } from 'svelte';

	interface Rule {
		currentColor: string;
		directions: string;
		newColors: string;
	}

	let rules: Rule[] = [
		{ currentColor: 'w', directions: 'ESWN', newColors: 'bbbb' },
		{ currentColor: 'b', directions: 'WNES', newColors: 'wwww' }
	];
	let steps = 11000;
	let newRule: Rule = { currentColor: '', directions: '', newColors: '' };
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const CANVAS_SIZE = 300;
	const GRID_CENTER = CANVAS_SIZE / 2;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		clearCanvas();
	});

	function clearCanvas() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}

	function runSimulation() {
		clearCanvas();

		// Initial state
		let pos = { x: GRID_CENTER, y: GRID_CENTER };
		let dir = 0; // North
		let grid = new Map<string, string>();

		// Convert rules to map
		let rulesMap = new Map<string, { dirs: string; symbols: string }>();
		let startSymbol = rules[0]?.currentColor || 'w';

		rules.forEach((rule) => {
			rulesMap.set(rule.currentColor, {
				dirs: rule.directions,
				symbols: rule.newColors
			});
		});

		// Run simulation
		for (let i = 0; i < steps; i++) {
			const key = `${pos.x},${pos.y}`;
			const currentSymbol = grid.get(key) || startSymbol;
			const rule = rulesMap.get(currentSymbol)!;

			// Draw current symbol
			ctx.fillStyle = currentSymbol === 'w' ? '#ffffff' : '#000000';
			ctx.fillRect(pos.x - 1, pos.y - 1, 2, 2);

			// Update position and direction
			const newSymbol = rule.symbols[dir];
			grid.set(key, newSymbol);

			const newDir = 'NESW'.indexOf(rule.dirs[dir]);
			dir = newDir;

			// Move ant
			switch (dir) {
				case 0:
					pos.y--;
					break; // North
				case 1:
					pos.x++;
					break; // East
				case 2:
					pos.y++;
					break; // South
				case 3:
					pos.x--;
					break; // West
			}
		}
	}
</script>

<EtudeDoc
	title="Ants"
	description="Simulate the movement of an ant on an infinite plane according to specified rules (its 'DNA'), and determine its final position after a given number of steps. Each rule specifies how the ant should turn and what color to leave behind based on the current color it encounters."
>
	<EtudeSection title="Simulation">
		<div class="etude-grid">
			<EtudeCard title="Visualization">
				<div class="canvas-container">
					<canvas bind:this={canvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
				</div>
			</EtudeCard>

			<EtudeCard title="Rules">
				<div class="rules-list">
					{#each rules as rule, i}
						<div class="rule-item">
							<div class="rule-display">
								If {rule.currentColor} → Turn {rule.directions} → New {rule.newColors}
								<button
									class="delete-btn"
									on:click={() => (rules = rules.filter((_, index) => index !== i))}>×</button
								>
							</div>
						</div>
					{/each}
				</div>

				<form
					class="add-rule-form"
					on:submit|preventDefault={() => {
						if (newRule.currentColor && newRule.directions && newRule.newColors) {
							rules = [...rules, { ...newRule }];
							newRule = { currentColor: '', directions: '', newColors: '' };
						}
					}}
				>
					<h4>Add Rule</h4>
					<div class="rule-inputs">
						<label>
							Current Color:
							<input
								type="text"
								bind:value={newRule.currentColor}
								placeholder="w/b"
								maxlength="1"
								class="input-small"
							/>
						</label>

						<label>
							Directions:
							<input
								type="text"
								bind:value={newRule.directions}
								placeholder="NESW"
								class="input-small"
							/>
						</label>

						<label>
							New Colors:
							<input
								type="text"
								bind:value={newRule.newColors}
								placeholder="wwbb"
								class="input-small"
							/>
						</label>

						<div class="button-container">
							<button type="submit" class="game-button">Add Rule</button>
						</div>
					</div>
				</form>

				<div class="simulation-controls">
					<h4>Steps</h4>
					<input type="number" bind:value={steps} min="1" max="100000" class="input-small" />
					<div class="button-container">
						<button class="game-button" on:click={runSimulation}>Run Simulation</button>
					</div>
				</div>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.canvas-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	.rules-list {
		margin-bottom: 20px;
	}

	.rule-item {
		padding: 8px;
		border: 1px solid #eee;
		margin-bottom: 8px;
		border-radius: 4px;
	}

	.rule-display {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.delete-btn {
		background: #ff4444;
		color: white;
		border: none;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-rule-form {
		margin-bottom: 20px;
	}

	.rule-inputs {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 10px;
	}

	.input-small {
		width: 100%;
		max-width: 200px;
		padding: 4px 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-family: monospace;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 0.9em;
		color: #666;
	}

	.simulation-controls {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid #eee;
	}

	.game-button {
		padding: 10px 20px;
		cursor: pointer;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1em;
	}

	.button-container {
		margin-top: 10px;
	}

	h4 {
		margin: 0 0 10px 0;
		color: #555;
	}
</style>
