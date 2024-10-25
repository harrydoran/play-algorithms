<script lang="ts">
	import EtudeDoc from '../../../components/EtudeDoc.svelte';
	import EtudeSection from '../../../components/EtudeSection.svelte';
	import EtudeCard from '../../../components/EtudeCard.svelte';

	interface ActionOutcome {
		title: string;
		outcomes: {
			condition: string;
			action: string;
		}[];
	}

	const steps: ActionOutcome[] = [
		{
			title: 'Initial Diagonal Check',
			outcomes: [
				{
					condition: 'Same',
					action: 'Proceed to Step 3'
				},
				{
					condition: 'Different',
					action: 'Flip all tails to heads'
				}
			]
		},
		{
			title: 'Second Diagonal Check',
			outcomes: [
				{
					condition: 'Different',
					action: 'Flip the odd one to win'
				},
				{
					condition: 'Same',
					action: 'Flip both coins'
				}
			]
		},
		{
			title: 'State Verification',
			outcomes: [
				{
					condition: 'Different',
					action: 'Flip odd one to win'
				},
				{
					condition: 'Same',
					action: 'Flip one coin'
				}
			]
		},
		{
			title: 'Horizontal Alignment',
			outcomes: [
				{
					condition: 'Same',
					action: 'Puzzle solved'
				},
				{
					condition: 'Different',
					action: 'Diagonal position achieved'
				}
			]
		},
		{
			title: 'Final Resolution',
			outcomes: [
				{
					condition: 'Any state',
					action: 'Choose diagonal coins and flip both to win'
				}
			]
		}
	];
</script>

<EtudeDoc
	title="Four the Same"
	description="A strategic puzzle involving four identical coins placed in containers at the corners of a rotating platform. The goal is to make all coins show the same face through a series of limited observations and actions."
>
	<EtudeSection title="Rules & Setup">
		<div class="rules-grid">
			<EtudeCard title="Platform">
				<ul>
					<li>Square platform that rotates around its center</li>
					<li>Four identical containers with lids at corners</li>
					<li>One identical coin in each container</li>
					<li>No markings allowed on any components</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Game Flow">
				<ul>
					<li>Press 'start' to randomize coins</li>
					<li>Platform rotates in darkness</li>
					<li>Choose and open two containers</li>
					<li>Option to flip visible coins</li>
					<li>Repeat until solved</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Constraints">
				<ul>
					<li>Must choose containers before opening</li>
					<li>Can only view two containers at once</li>
					<li>Cannot track platform rotation</li>
					<li>All components are identical</li>
				</ul>
			</EtudeCard>
		</div>
	</EtudeSection>

	<EtudeSection title="Solution Strategy">
		<div class="strategy">
			{#each steps as step, i}
				<EtudeCard title={`Step ${i + 1}: ${step.title}`}>
					<div class="outcomes">
						{#each step.outcomes as outcome}
							<div class="outcome">
								<span class="condition">{outcome.condition}:</span>
								<span class="action">{outcome.action}</span>
							</div>
						{/each}
					</div>
				</EtudeCard>
			{/each}
		</div>
	</EtudeSection>

	<EtudeSection title="Method Analysis">
		<div class="analysis-grid">
			<EtudeCard title="Performance">
				<ul>
					<li>Minimum steps: 2</li>
					<li>Maximum steps: 5</li>
					<li>Guaranteed solution</li>
				</ul>
			</EtudeCard>

			<EtudeCard title="Benefits">
				<ul>
					<li>Systematic approach</li>
					<li>Clear decision points</li>
					<li>Works with any initial state</li>
					<li>No position tracking needed</li>
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

	.outcomes {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.outcome {
		display: flex;
		gap: 0.5rem;
	}

	.condition {
		color: #666;
		font-weight: bold;
	}

	.action {
		color: #444;
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
