<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { onMount } from 'svelte';
	import type { GridData, PathResult } from '$lib/social-distance';
	import { parseInput, calculatePath } from '$lib/social-distance';

	let inputText = `9 8
8 0
1 2
2 6
6 6`;
	let outputText = '';
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let currentGrid: GridData | null = null;
	let currentPath: PathResult | null = null;
	const CELL_SIZE = 40;
	const PADDING = 20;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		parseAndVisualize();
	});

	function drawGrid(grid: GridData, pathResult?: PathResult) {
		const width = grid.cols * CELL_SIZE + 2 * PADDING;
		const height = grid.rows * CELL_SIZE + 2 * PADDING;
		canvas.width = width;
		canvas.height = height;

		// Clear canvas
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, width, height);

		// Draw grid lines
		ctx.strokeStyle = '#ccc';
		ctx.lineWidth = 1;

		for (let i = 0; i <= grid.rows; i++) {
			ctx.beginPath();
			ctx.moveTo(PADDING, PADDING + i * CELL_SIZE);
			ctx.lineTo(PADDING + grid.cols * CELL_SIZE, PADDING + i * CELL_SIZE);
			ctx.stroke();
		}

		for (let i = 0; i <= grid.cols; i++) {
			ctx.beginPath();
			ctx.moveTo(PADDING + i * CELL_SIZE, PADDING);
			ctx.lineTo(PADDING + i * CELL_SIZE, PADDING + grid.rows * CELL_SIZE);
			ctx.stroke();
		}

		// Draw seated people
		ctx.fillStyle = '#333';
		for (const person of grid.people) {
			ctx.beginPath();
			ctx.arc(
				PADDING + person.col * CELL_SIZE + CELL_SIZE / 2,
				PADDING + person.row * CELL_SIZE + CELL_SIZE / 2,
				CELL_SIZE / 4,
				0,
				2 * Math.PI
			);
			ctx.fill();
		}

		// Draw the path if it exists
		if (pathResult?.path) {
			// Draw path segments
			ctx.strokeStyle = '#ff4444';
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.beginPath();

			pathResult.path.forEach((point, index) => {
				const x = PADDING + point.col * CELL_SIZE + CELL_SIZE / 2;
				const y = PADDING + point.row * CELL_SIZE + CELL_SIZE / 2;

				if (index === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			});
			ctx.stroke();

			// Draw path points
			ctx.fillStyle = '#ff4444';
			pathResult.path.forEach((point, index) => {
				if (index !== 0 && index !== pathResult.path.length - 1) {
					ctx.beginPath();
					ctx.arc(
						PADDING + point.col * CELL_SIZE + CELL_SIZE / 2,
						PADDING + point.row * CELL_SIZE + CELL_SIZE / 2,
						CELL_SIZE / 6,
						0,
						2 * Math.PI
					);
					ctx.fill();
				}
			});
		}

		// Draw start and end points
		ctx.fillStyle = '#4CAF50';
		ctx.beginPath();
		ctx.arc(PADDING + CELL_SIZE / 2, PADDING + CELL_SIZE / 2, CELL_SIZE / 4, 0, 2 * Math.PI);
		ctx.fill();

		ctx.fillStyle = '#F44336';
		ctx.beginPath();
		ctx.arc(
			PADDING + (grid.cols - 1) * CELL_SIZE + CELL_SIZE / 2,
			PADDING + (grid.rows - 1) * CELL_SIZE + CELL_SIZE / 2,
			CELL_SIZE / 4,
			0,
			2 * Math.PI
		);
		ctx.fill();
	}

	function parseAndVisualize() {
		try {
			currentGrid = parseInput(inputText);
			currentPath = calculatePath(inputText);
			drawGrid(currentGrid, currentPath);
			outputText = `min ${currentPath.min}, total ${currentPath.total}`;
		} catch {
			outputText = 'Error: Invalid input format';
			currentGrid = null;
			currentPath = null;
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	}
</script>

<EtudeDoc
	title="Social Distance"
	description="Determine the optimal path through a grid that maximizes both the minimum and total distances from seated people."
>
	<EtudeSection title="Path Finder">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<div class="control-section">
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter grid dimensions and seated positions..."
						rows="6"
						spellcheck="false"
					/>
					<div class="button-container">
						<button class="game-button" on:click={() => parseAndVisualize()}>Find Path</button>
					</div>
				</div>
			</EtudeCard>

			<EtudeCard title="Result">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Visualization">
		<EtudeCard title="Grid">
			<div class="canvas-container">
				<canvas bind:this={canvas} />
			</div>
			<div class="grid-legend">
				<div class="legend-item">
					<span class="legend-dot start" /> Start point
				</div>
				<div class="legend-item">
					<span class="legend-dot end" /> End point
				</div>
				<div class="legend-item">
					<span class="legend-dot seated" /> Seated person
				</div>
				<div class="legend-item">
					<span class="legend-line path" /> Optimal path
				</div>
			</div>
		</EtudeCard>
	</EtudeSection>

	<EtudeSection title="Guide">
		<div class="etude-grid">
			<EtudeCard title="Input Format">
				<pre class="etude-pre">9 8     # rows columns
8 0     # seated person
1 2     # seated person
2 6     # seated person
6 6     # seated person</pre>
				<ul class="etude-list">
					<li>First line: Number of rows and columns</li>
					<li>Following lines: Row and column positions of seated people</li>
					<li>Grid starts at (0,0) in top-left corner</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Path Rules">
				<ul class="etude-list">
					<li>Path must go from top-left to bottom-right</li>
					<li>Can only move horizontally or vertically</li>
					<li>Must maximize minimum distance from any seated person</li>
					<li>Must maximize total distance while maintaining minimum</li>
					<li>Distance is measured as Manhattan distance (|x1-x2| + |y1-y2|)</li>
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

	.canvas-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		background: white;
		border-radius: 4px;
		overflow-x: auto;
	}

	canvas {
		background: white;
	}

	.grid-legend {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 15px;
		flex-wrap: wrap;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #666;
		font-size: 0.9em;
	}

	.legend-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.legend-line {
		width: 20px;
		height: 3px;
		border-radius: 2px;
	}

	.start {
		background: #4caf50;
	}

	.end {
		background: #f44336;
	}

	.seated {
		background: #333;
	}

	.path {
		background: #ff4444;
	}
</style>
