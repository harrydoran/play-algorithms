<script lang="ts">
	import { onMount } from 'svelte';

	let dnaInput = `# Langton
w ESWN bbbb
b WNES wwww
1000`;
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

		// Parse DNA rules
		let rules = new Map<string, { dirs: string; symbols: string }>();
		let startSymbol = '';

		dnaInput.split('\n').forEach((line) => {
			if (line.startsWith('#') || line.trim() === '') return;

			const parts = line.trim().split(' ');
			if (parts.length === 1) {
				// Number of moves - ignore for now
				return;
			}

			const [state, dirs, symbols] = parts;
			rules.set(state, { dirs, symbols });
			if (!startSymbol) startSymbol = state;
		});

		// Run simulation
		for (let i = 0; i < 11000; i++) {
			const key = `${pos.x},${pos.y}`;
			const currentSymbol = grid.get(key) || startSymbol;
			const rule = rules.get(currentSymbol)!;

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

<div class="simulation">
	<div class="controls">
		<textarea bind:value={dnaInput} placeholder="Enter DNA instructions..." rows="10"></textarea>
		<button on:click={runSimulation}>Run Simulation</button>
	</div>

	<div class="canvas-container">
		<canvas bind:this={canvas} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
	</div>
</div>

<style>
	.simulation {
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
	}

	.canvas-container {
		border: 1px solid #ccc;
		background: white;
	}

	canvas {
		display: block;
	}

	button {
		padding: 10px;
		cursor: pointer;
	}
</style>
