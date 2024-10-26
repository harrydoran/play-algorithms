<script lang="ts">
	import { FileText } from 'lucide-svelte';
	import { base } from '$app/paths';
	export let slug;
</script>

<a
	href={`${base}/etude-specs/${slug}.pdf`}
	target="_blank"
	rel="noopener noreferrer"
	class="spec-link"
	title="View Problem Specification"
>
	<FileText size={20} />
</a>

<style>
	.spec-link {
		color: #333 !important;
		text-decoration: none;
	}
	.spec-link:hover {
		color: #666 !important;
	}
</style>
