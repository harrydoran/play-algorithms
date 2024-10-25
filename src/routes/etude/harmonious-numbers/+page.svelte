<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import {
		findHarmoniousPairs,
		formatPairs,
		validateLimit,
		benchmarkTime,
		DefaultMaxNum,
		AchievedMaxNum
	} from '$lib/harmonious';

	let limitInput = AchievedMaxNum.toString();
	let outputText = '';
	let timeElapsed = 0;
	let showTimer = false;
	let isProcessing = false;

	async function findNumbers() {
		try {
			isProcessing = true;
			const limit = validateLimit(limitInput);

			// Use setTimeout to allow UI to update before heavy computation
			setTimeout(() => {
				try {
					const execTime = benchmarkTime(() => {
						const pairs = findHarmoniousPairs(limit);
						outputText = formatPairs(pairs);
					});

					if (showTimer) {
						timeElapsed = execTime;
					}
				} finally {
					isProcessing = false;
				}
			}, 0);
		} catch (error) {
			outputText = `Error: ${error.message}`;
			isProcessing = false;
		}
	}
</script>

<EtudeDoc
	title="Harmonious Numbers"
	description="Find pairs of harmonious numbers where the sum of proper divisors (excluding 1) of each number equals the other."
>
	<EtudeSection title="Number Finder">
		<div class="etude-grid">
			<EtudeCard title="Controls">
				<div class="control-section">
					<div class="input-group">
						<label for="limit">Upper Limit:</label>
						<input
							id="limit"
							type="number"
							bind:value={limitInput}
							min="1"
							max={DefaultMaxNum}
							class="number-input"
						/>
					</div>
					<div class="checkbox-group">
						<label>
							<input type="checkbox" bind:checked={showTimer} />
							Show execution time
						</label>
					</div>
					<div class="button-container">
						<button class="game-button" on:click={findNumbers} disabled={isProcessing}>
							{isProcessing ? 'Processing...' : 'Find Pairs'}
						</button>
					</div>
					{#if showTimer && timeElapsed > 0}
						<div class="timer">
							Completed in {timeElapsed.toFixed(2)} seconds
						</div>
					{/if}
				</div>
			</EtudeCard>
			<EtudeCard title="Results">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Information">
		<div class="etude-grid">
			<EtudeCard title="Harmonious Numbers">
				<ul class="etude-list">
					<li>Pairs where sum of proper divisors (excluding 1) equals the other number</li>
					<li>Smaller number must be less than 2,000,000</li>
					<li>Achieved standard: Up to 100,000</li>
					<li>Merit standard: Up to 2,000,000</li>
					<li>Pairs are listed in ascending order</li>
				</ul>
			</EtudeCard>
			<EtudeCard title="Example">
				<div class="example-section">
					<h4>Sample Pair: 220 and 284</h4>
					<p>Proper divisors of 220 (excluding 1):</p>
					<code>2, 4, 5, 10, 11, 20, 22, 44, 55, 110</code>
					<p>Sum: 284</p>
					<p>Proper divisors of 284 (excluding 1):</p>
					<code>2, 4, 71, 142</code>
					<p>Sum: 220</p>
				</div>
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

	.input-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.number-input {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 150px;
	}

	.checkbox-group {
		display: flex;
		align-items: center;
		gap: 5px;
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

	.game-button:hover:not(:disabled) {
		background: #f0f0f0;
	}

	.game-button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.timer {
		font-family: monospace;
		color: #666;
		padding: 5px;
		background: #f8f8f8;
		border-radius: 4px;
	}

	.example-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.example-section code {
		display: block;
		background: #f8f8f8;
		padding: 8px;
		border-radius: 4px;
		margin: 5px 0;
	}

	h4 {
		margin: 0;
		color: #555;
		font-size: 1.1em;
	}
</style>
