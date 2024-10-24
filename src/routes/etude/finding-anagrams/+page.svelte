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
			const output: string[] = [];

			for (const word of words) {
				const anagram = findBestAnagram(word, dictionary, []);
				output.push(formatOutput(word, anagram));
			}

			outputText = output.join('\n');
		} catch {
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
