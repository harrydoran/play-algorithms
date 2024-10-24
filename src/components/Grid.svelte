<script>
	import Card from './Card.svelte';

	// Sample data for 12 cards
	const cards = [
		{
			title: 'Parsing Partitions',
			description:
				'Identify, validate, and standardize the format of integer partition data from text files containing various types of content.',
			etudeNumber: '01',
			slug: 'parsing-partitions'
		},
		{
			title: 'Rollin',
			description:
				'Develop a strategy for a dice game where the goal is to form two sets of three dice (matching or in sequence) as quickly as possible.',
			etudeNumber: '02'
		},
		{
			title: 'Ants',
			description:
				'Simulate the movement of an ant on an infinite plane according to specified rules (its "DNA"), and determine its final position after a given number of steps.',
			etudeNumber: '03'
		},
		{
			title: 'Quilt',
			description:
				'Generate a visual representation of a quilt design with layered squares of different colors and sizes based on input parameters.',
			etudeNumber: '04'
		},
		{
			title: 'Pathfinding Partitions',
			description:
				'Find the shortest sequence of transformations to change one integer partition into another using specific column-to-row moves.',
			etudeNumber: '05'
		},
		{
			title: 'Carpets',
			description:
				'Create optimal carpet designs by combining colored strips according to various aesthetic criteria specified by customers.',
			etudeNumber: '06'
		},
		{
			title: 'Finding Anagrams',
			description:
				'Find the best anagrams for given words using a provided dictionary, prioritizing longer words and alphabetical order.',
			etudeNumber: '07'
		},
		{
			title: 'Four the Same',
			description:
				'Devise a strategy to guarantee aligning four hidden coins on a rotating platform by examining and potentially flipping two coins at a time.',
			etudeNumber: '08'
		},
		{
			title: 'Social Distance',
			description:
				'Determine the optimal path through a grid that maximizes both the minimum and total distances from seated people.',
			etudeNumber: '09'
		},
		{
			title: 'Playing Partitions',
			description:
				'Analyze a two-player game involving Ferrers boards and target positions to determine the outcome (win, lose, or draw) from a given starting position.',
			etudeNumber: '10'
		},
		{
			title: 'One-dimensional Solitaire',
			description:
				'Determine the number of distinct winnable starting positions in a peg-hopping game on an infinite strip with a given number of pegs.',
			etudeNumber: '11'
		},
		{
			title: 'Harmonious Numbers',
			description:
				"Find all pairs of numbers below 2,000,000 where the sum of one number's proper divisors (excluding 1) equals the other number.",
			etudeNumber: '12'
		}
	];
</script>

<div class="grid">
	{#each cards as card}
		<Card {...card} slug={card.title.toLowerCase().replace(/\s+/g, '-')} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
		padding: 20px;
	}
</style>
