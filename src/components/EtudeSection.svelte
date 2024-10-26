<script lang="ts">
	export let title;
</script>

<section>
	<h2>{title}</h2>
	<slot />
</section>

<style>
	section {
		margin-bottom: 2rem;
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		color: #444;
		margin: 0 0 1.5rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #f0f0f0;
	}
</style>
