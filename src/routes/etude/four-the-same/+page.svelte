<script lang="ts">
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

<div class="game-doc">
	<section class="intro">
		<h1>Four the Same</h1>
		<p class="description">
			A strategic puzzle involving four identical coins placed in containers at the corners of a
			rotating platform. The goal is to make all coins show the same face through a series of
			limited observations and actions.
		</p>
	</section>

	<section class="rules">
		<h2>Rules & Setup</h2>
		<div class="rules-grid">
			<div class="rule-card">
				<h3>Platform</h3>
				<ul>
					<li>Square platform that rotates around its center</li>
					<li>Four identical containers with lids at corners</li>
					<li>One identical coin in each container</li>
					<li>No markings allowed on any components</li>
				</ul>
			</div>

			<div class="rule-card">
				<h3>Game Flow</h3>
				<ul>
					<li>Press 'start' to randomize coins</li>
					<li>Platform rotates in darkness</li>
					<li>Choose and open two containers</li>
					<li>Option to flip visible coins</li>
					<li>Repeat until solved</li>
				</ul>
			</div>

			<div class="rule-card">
				<h3>Constraints</h3>
				<ul>
					<li>Must choose containers before opening</li>
					<li>Can only view two containers at once</li>
					<li>Cannot track platform rotation</li>
					<li>All components are identical</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="solution">
		<h2>Solution Strategy</h2>
		<div class="strategy">
			{#each steps as step, i}
				<div class="step-card">
					<h3>Step {i + 1}: {step.title}</h3>
					<div class="outcomes">
						{#each step.outcomes as outcome}
							<div class="outcome">
								<span class="condition">{outcome.condition}:</span>
								<span class="action">{outcome.action}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="analysis">
		<h2>Method Analysis</h2>
		<div class="analysis-grid">
			<div class="analysis-card">
				<h3>Performance</h3>
				<ul>
					<li>Minimum steps: 2</li>
					<li>Maximum steps: 5</li>
					<li>Guaranteed solution</li>
				</ul>
			</div>

			<div class="analysis-card">
				<h3>Benefits</h3>
				<ul>
					<li>Systematic approach</li>
					<li>Clear decision points</li>
					<li>Works with any initial state</li>
					<li>No position tracking needed</li>
				</ul>
			</div>
		</div>
	</section>
</div>

<style>
	.game-doc {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	section {
		margin-bottom: 2rem;
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1 {
		color: #333;
		margin: 0 0 1rem 0;
	}

	h2 {
		color: #444;
		margin: 0 0 1.5rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #f0f0f0;
	}

	h3 {
		color: #555;
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
	}

	.description {
		color: #666;
		font-size: 1.1rem;
		line-height: 1.6;
		margin: 0;
	}

	.rules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.rule-card {
		background: #f8f8f8;
		padding: 1rem;
		border-radius: 6px;
	}

	.strategy {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.step-card {
		background: #f8f8f8;
		padding: 1rem;
		border-radius: 6px;
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

	.analysis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.analysis-card {
		background: #f8f8f8;
		padding: 1rem;
		border-radius: 6px;
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
