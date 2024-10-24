<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { onMount } from 'svelte';
	import { parseInput, generateQuilt } from '$lib/quilt';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	const CANVAS_SIZE = 600;

	let inputText = `1.0 255 0 0
0.8 0 255 0
0.1 0 0 255`;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		generateQuiltFromInput();
	});

	function generateQuiltFromInput() {
		const { scales, colors } = parseInput(inputText);
		generateQuilt(ctx, CANVAS_SIZE, scales, colors);
	}

	function downloadQuilt() {
		const link = document.createElement('a');
		link.download = 'quilt.png';
		link.href = canvas.toDataURL('image/png');
		link.click();
	}
</script>

<EtudeDoc
	title="Quilt"
	description="Generate a visual representation of a quilt design with layered squares of different colors and sizes based on input parameters."
>
	<EtudeSection title="Visualization">
		<div class="etude-grid">
			<EtudeCard title="Design">
				<div class="canvas-wrapper">
					<canvas bind:this={canvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
				</div>
			</EtudeCard>

			<EtudeCard title="Controls">
				<div class="control-section">
					<h4>Parameters</h4>
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter quilt parameters..."
						rows="6"
						spellcheck="false"
					/>
					<div class="button-container">
						<button class="game-button" on:click={generateQuiltFromInput}>Generate</button>
						<button class="game-button" on:click={downloadQuilt}>Download PNG</button>
					</div>
				</div>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Instructions">
		<div class="etude-grid">
			<EtudeCard title="Input Format">
				<p class="etude-info">Each line should contain:</p>
				<ul class="etude-list">
					<li>Scale factor (e.g., 1.0, 0.8)</li>
					<li>Red value (0-255)</li>
					<li>Green value (0-255)</li>
					<li>Blue value (0-255)</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Example Input">
				<pre class="etude-pre">1.0 255 0 0     # Red square
0.8 0 255 0     # Green square at 80%
0.1 0 0 255     # Blue square at 10%</pre>
				<p class="etude-info">
					The scale parameter determines the relative size of each square layer. Later squares are
					centered at the corners of earlier ones.
				</p>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.canvas-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		background: white;
		border-radius: 4px;
	}

	canvas {
		border: 1px solid #ccc;
		max-width: 100%;
		height: auto;
	}

	.control-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h4 {
		margin: 0 0 10px 0;
		color: #555;
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

	:global(.etude-pre) {
		background: #f8f8f8;
		padding: 10px;
		border-radius: 4px;
		overflow-x: auto;
		margin: 0;
	}

	@media (max-width: 800px) {
		canvas {
			width: 100%;
			height: auto;
		}
	}
</style>
