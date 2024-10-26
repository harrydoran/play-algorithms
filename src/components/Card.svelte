<script>
	import { base } from '$app/paths';

	export let title = '';
	export let description = '';
	export let etudeNumber = '';

	// Convert title to URL-safe slug
	const slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
</script>

<a href="{base}/etude/{slug}" class="card">
	<span class="etude-number">#{etudeNumber}</span>
	<div class="card-content">
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
</a>

<style>
	.card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 16px;
		color: inherit;
		display: block;
		transition: box-shadow 0.3s ease;
		position: relative;
		text-decoration: none;
	}

	.card:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.etude-number {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 0.9em;
		color: #888;
		background-color: #f0f0f0;
		padding: 2px 6px;
		border-radius: 4px;
	}

	h3 {
		margin: 0 0 8px 0;
		font-size: 1.2em;
		padding-right: 30px;
	}

	p {
		margin: 0;
		color: #666;
	}
</style>
