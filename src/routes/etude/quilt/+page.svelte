<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { onMount } from 'svelte';
	import { parseInput, generateQuilt } from '$lib/quilt';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	const CANVAS_SIZE = 600;

	// Default to Fibonacci example
	let inputText = `# Fibonacci scaling pattern
1.0 255 0 0       # Base red square
0.618 0 255 0     # Green at golden ratio
0.382 0 0 255     # Blue at golden ratio squared
0.236 255 255 0   # Yellow at further reduction
0.146 255 0 255   # Magenta at smallest scale`;

	const examples = {
		fibonacci: `# Fibonacci scaling pattern
1.0 255 0 0       # Base red square
0.618 0 255 0     # Green at golden ratio
0.382 0 0 255     # Blue at golden ratio squared
0.236 255 255 0   # Yellow at further reduction
0.146 255 0 255   # Magenta at smallest scale`,

		prime: `# Prime number scaling
1.0 255 0 0       # Base square
0.7 0 255 0       # Approx 1/√2
0.5 0 0 255       # 1/2
0.3 255 255 0     # Approx 1/√11
0.2 255 0 255     # 1/5
0.11 0 255 255    # 1/11`,

		monochrome: `# Monochromatic gradient
1.0 50 50 50      # Dark gray
0.8 100 100 100   # Medium gray
0.6 150 150 150   # Light gray
0.4 200 200 200   # Lighter gray
0.2 250 250 250   # Almost white`,

		minimal: `# Zero and near-zero colors
1.0 0 0 0         # Black
0.8 1 1 1         # Nearly black
0.6 2 2 2         # Very dark gray
0.4 3 3 3         # Still very dark
0.2 255 255 255   # White contrast`
	};

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

	function loadExample(key: keyof typeof examples) {
		inputText = examples[key];
		generateQuiltFromInput();
	}
</script>

<EtudeDoc
	title="Quilt Generator"
	description="Generate geometric quilt patterns with layered squares of different colors and sizes."
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
					<div class="example-buttons">
						<h4>Example Patterns:</h4>
						<div class="button-grid">
							<button class="pattern-button" on:click={() => loadExample('fibonacci')}>
								Fibonacci
							</button>
							<button class="pattern-button" on:click={() => loadExample('prime')}> Prime </button>
							<button class="pattern-button" on:click={() => loadExample('monochrome')}>
								Monochrome
							</button>
							<button class="pattern-button" on:click={() => loadExample('minimal')}>
								Minimal
							</button>
						</div>
					</div>
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter quilt parameters..."
						rows="8"
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
					<li>Scale factor (relative size)</li>
					<li>Red value (0-255)</li>
					<li>Green value (0-255)</li>
					<li>Blue value (0-255)</li>
				</ul>
				<p class="etude-info">Comments starting with # are ignored</p>
			</EtudeCard>
			<EtudeCard title="Pattern Types">
				<ul class="etude-list">
					<li>
						<strong>Fibonacci:</strong> Uses golden ratio for natural-looking progression
					</li>
					<li>
						<strong>Prime:</strong> Based on prime number reciprocals for unique scaling
					</li>
					<li>
						<strong>Monochrome:</strong> Gradual progression through grayscale
					</li>
					<li>
						<strong>Minimal:</strong> Explores extreme contrast with near-zero values
					</li>
				</ul>
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

	h4 {
		margin: 0;
		color: #555;
		font-size: 1em;
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
