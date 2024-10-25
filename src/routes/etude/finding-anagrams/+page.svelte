<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';
	import { parseInput, findBestAnagram, formatOutput } from '$lib/anagrams';

	let inputText = `apple
appleapple
frog
app
el
leap
pel`;
	let outputText = '';

	function findAnagrams() {
		try {
			const { words, dictionary } = parseInput(inputText);
			const results = [];

			for (const word of words) {
				const anagram = findBestAnagram(word, dictionary, []);
				results.push(formatOutput(word, anagram));
			}

			outputText = results.join('\n');
		} catch (error) {
			outputText = 'Error: Invalid input format';
		}
	}
</script>

<EtudeDoc
	title="Finding Anagrams"
	description="Find the best anagrams for given words using a provided dictionary, prioritizing longer words and alphabetical order."
>
	<EtudeSection title="Anagram Finder">
		<div class="etude-grid">
			<EtudeCard title="Input">
				<p class="etude-info">Enter words followed by dictionary (separated by blank line):</p>
				<textarea
					class="etude-input"
					bind:value={inputText}
					placeholder="Enter words and dictionary..."
					rows="10"
					spellcheck="false"
				/>
				<button class="etude-button" on:click={findAnagrams}>Find Anagrams</button>
			</EtudeCard>
			<EtudeCard title="Output">
				<pre class="etude-pre">{outputText}</pre>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Example & Rules">
		<div class="etude-grid">
			<EtudeCard title="Input Format">
				<pre class="etude-pre">apple
appleapple
frog
app
el
leap
pel</pre>
				<ul class="etude-list">
					<li>First section: Words to find anagrams for</li>
					<li>Empty line as separator</li>
					<li>Second section: Dictionary words</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Ranking Rules">
				<ul class="etude-list">
					<li>Longer words are preferred over shorter ones</li>
					<li>When lengths are equal, alphabetical order decides</li>
					<li>Only complete dictionary words are allowed</li>
					<li>Words can be reused in a solution</li>
					<li>Capitalization and whitespace are ignored</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.etude-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.etude-input {
		width: 100%;
		font-family: monospace;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}

	.etude-button {
		margin-top: 10px;
		padding: 8px 16px;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
	}

	.etude-button:hover {
		background: #f0f0f0;
	}

	.etude-info {
		margin-bottom: 10px;
		color: #666;
	}

	:global(.etude-pre) {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: monospace;
		background: #f8f8f8;
		padding: 10px;
		border-radius: 4px;
		margin: 0;
	}

	:global(.etude-list) {
		list-style-type: disc;
		padding-left: 20px;
		margin: 0;
	}

	:global(.etude-list li) {
		margin-bottom: 8px;
		color: #666;
	}
</style>
