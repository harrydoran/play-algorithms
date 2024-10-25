<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { onMount } from 'svelte';
	import type { GridData, PathResult } from '$lib/social-distance';
	import { parseInput, calculatePath } from '$lib/social-distance';

	const examples = {
		corridor: `# Corridor Challenge
9 8      # Grid size
4 0      # Creates a narrow corridor
4 1
4 2
4 3
4 5
4 6
4 7`,

		diagonal: `# Diagonal Formation
8 8      # Grid size
1 1      # Diagonal line of people
2 2
3 3
4 4
5 5
6 6`,

		corners: `# Corner Guards
10 10    # Grid size
1 1      # People in corners
1 8
8 1
8 8      # Forces path through middle`,

		sparse: `# Sparse Distribution
12 12    # Grid size
2 3      # Scattered people
4 8
7 4
9 9
3 10
10 2`
	};

	let inputText = examples.corridor;
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
			outputText = `Minimum distance: ${currentPath.min}, Average distance: ${currentPath.total}`;
		} catch (error) {
			outputText = `Error: ${error.message}`;
			currentGrid = null;
			currentPath = null;
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	}

	function loadExample(key: keyof typeof examples) {
		inputText = examples[key];
		parseAndVisualize();
	}
</script>

<EtudeDoc
	title="Social Distance Pathfinder"
	description="Find optimal paths through a grid while maintaining maximum distance from seated people."
>
	<EtudeSection title="Path Finder">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<div class="control-section">
					<div class="example-buttons">
						<h4>Example Scenarios:</h4>
						<div class="button-grid">
							<button class="pattern-button" on:click={() => loadExample('corridor')}>
								Corridor
							</button>
							<button class="pattern-button" on:click={() => loadExample('diagonal')}>
								Diagonal
							</button>
							<button class="pattern-button" on:click={() => loadExample('corners')}>
								Corners
							</button>
							<button class="pattern-button" on:click={() => loadExample('sparse')}>
								Sparse
							</button>
						</div>
					</div>
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter grid dimensions and seated positions..."
						rows="8"
						spellcheck="false"
					/>
					<button class="game-button" on:click={parseAndVisualize}>Find Path</button>
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

	<EtudeSection title="Scenarios">
		<div class="etude-grid">
			<EtudeCard title="Scenario Types">
				<ul class="etude-list">
					<li>
						<strong>Corridor Challenge:</strong> Creates a narrow passage that tests minimum distance
						constraints
					</li>
					<li>
						<strong>Diagonal Formation:</strong> Forces path to choose between following or avoiding
						the diagonal
					</li>
					<li>
						<strong>Corner Guards:</strong> Tests path finding through open center space
					</li>
					<li>
						<strong>Sparse Distribution:</strong> Tests balancing multiple scattered constraints
					</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Path Rules">
				<ul class="etude-list">
					<li>Path must go from top-left to bottom-right</li>
					<li>Can only move horizontally or vertically</li>
					<li>Must maximize minimum distance from any seated person</li>
					<li>Must maximize total distance while maintaining minimum</li>
					<li>Comments starting with # are ignored</li>
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

	.example-buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 8px;
	}

	.pattern-button {
		padding: 8px 12px;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9em;
	}

	.pattern-button:hover {
		background: #f0f0f0;
	}

	.input-field {
		width: 100%;
		font-family: monospace;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
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

	:global(.etude-list) strong {
		color: #444;
	}

	@media (max-width: 800px) {
		canvas {
			width: 100%;
			height: auto;
		}

		.button-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
