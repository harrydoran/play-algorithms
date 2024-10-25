<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';

	interface SolutionStep {
		title: string;
		description: string;
		example?: string;
	}

	const steps: SolutionStep[] = [
		{
			title: 'Initial Setup',
			description: 'Start with a peg in the middle of a large board of holes',
			example: '00000100000'
		},
		{
			title: 'Forward Pattern Search',
			description: 'Scan the board for the substring "100". If found, change to "011"'
		},
		{
			title: 'Reverse Pattern Search',
			description: 'If "100" not found, look for "001" and change to "110"'
		},
		{
			title: 'State Generation',
			description:
				'Repeat the process, exploring all possible states leading back to solvable configurations'
		},
		{
			title: 'Solution Verification',
			description:
				'Check if current board contains 20 pegs, terminate branch and add to winnable states if true'
		}
	];
</script>

<EtudeDoc
	title="One-Dimensional Solitaire"
	description="A strategic puzzle game involving pegs and holes on a one-dimensional board. The goal is to find valid starting positions that can be solved through a series of jumps, reducing the board to a single peg."
>
	<EtudeSection title="Research & Approach">
		<div class="rules-grid">
			<EtudeCard title="Initial Analysis">
				<ul>
					<li>Identified impossible states (e.g., three adjacent holes)</li>
					<li>Discovered patterns preventing solutions</li>
					<li>Analyzed movement constraints</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Method Evolution">
				<ul>
					<li>Started with elimination of impossible states</li>
					<li>Shifted to identifying correct solutions</li>
					<li>Discovered Cornell University research</li>
					<li>Implemented "de-hopping" approach</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Implementation">
				<ul>
					<li>Developed iterative solution using queue</li>
					<li>Optimized for performance</li>
					<li>Added formatting improvements</li>
					<li>Created custom output generator</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Solution Strategy">
		<div class="strategy">
			{#each steps as step}
				<EtudeCard title={step.title}>
					<p>{step.description}</p>
					{#if step.example}
						<div class="example">Example: <code>{step.example}</code></div>
					{/if}
				</EtudeCard>
			{/each}
		</div>
	</EtudeSection>

	<EtudeSection title="Method Analysis">
		<div class="analysis-grid">
			<EtudeCard title="Achievements">
				<ul>
					<li>Quick solution generation</li>
					<li>Verified solvable states</li>
					<li>Well-formatted output</li>
					<li>Memory-efficient approach</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Future Improvements">
				<ul>
					<li>Animation generator for solutions</li>
					<li>Further performance optimization</li>
					<li>Visual step-by-step guide</li>
					<li>Interactive solution validator</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>
</EtudeDoc>

<style>
	.rules-grid,
	.strategy,
	.analysis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.example {
		margin-top: 0.5rem;
		padding: 0.5rem;
		background: #eee;
		border-radius: 4px;
		font-family: monospace;
	}

	ul {
		margin: 0;
		padding-left: 1.2rem;
		color: #666;
	}

	li {
		margin-bottom: 0.5rem;
	}

	@media (max-width: 600px) {
		.rules-grid,
		.strategy,
		.analysis-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
