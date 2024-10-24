<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { makeCarpet } from '$lib/carpet';

	let inputText = `rrr
bbb
rrr
rrr
bbb
rbr`;
	let size = 3;
	let mode = '-m';
	let outputText = '';

	function generateCarpet() {
		const result = makeCarpet(inputText, size, mode);
		if (!result) {
			outputText = 'Not Possible';
			return;
		}

		const output = [];
		for (const piece of result.carpet) {
			output.push(piece);
		}

		if (mode === '-m' && result.score !== undefined) {
			output.push(result.score.toString());
		} else if (mode === '-b' && result.balance !== undefined) {
			output.push(result.balance.toString());
		}

		outputText = output.join('\n');
	}
</script>

<EtudeDoc
	title="Carpets"
	description="Create optimal carpet designs by combining colored strips according to various aesthetic criteria specified by customers."
>
	<EtudeSection title="Carpet Generator">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<div class="control-section">
					<textarea
						class="input-field"
						bind:value={inputText}
						placeholder="Enter carpet strips..."
						rows="10"
						spellcheck="false"
					/>

					<div class="parameters">
						<h4>Parameters</h4>
						<div class="param-inputs">
							<label>
								Size:
								<input type="number" bind:value={size} min="1" max="20" class="input-small" />
							</label>

							<label>
								Mode:
								<select bind:value={mode} class="input-small">
									<option value="-m">Maximum matches</option>
									<option value="-n">No matches</option>
									<option value="-b">Best balance</option>
								</select>
							</label>
						</div>
					</div>

					<div class="button-container">
						<button class="game-button" on:click={generateCarpet}>Generate Carpet</button>
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
				<pre class="etude-pre">rrr
bbb
rrr
rrr
bbb
rbr</pre>
				<ul class="etude-list">
					<li>Each line represents one carpet strip</li>
					<li>All strips must have the same length</li>
					<li>'Size' determines how many strips to use</li>
					<li>Characters represent colors (e.g., 'r' for red)</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Matching Modes">
				<ul class="etude-list">
					<li>
						<strong>Maximum matches:</strong>
						Create a carpet with the most color matches between strips
					</li>
					<li>
						<strong>No matches:</strong>
						Ensure no colors match between adjacent strips
					</li>
					<li>
						<strong>Best balance:</strong>
						Find optimal balance between matches and non-matches
					</li>
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

	.parameters {
		background: #f8f8f8;
		padding: 15px;
		border-radius: 6px;
	}

	h4 {
		margin: 0 0 10px 0;
		color: #555;
	}

	.param-inputs {
		display: flex;
		gap: 20px;
	}

	.input-small {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 150px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		color: #666;
		font-size: 0.9em;
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

	strong {
		color: #333;
	}
</style>
