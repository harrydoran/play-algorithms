<script lang="ts">
 export let title: string;
 export let description: string;
</script>

<div class="etude-doc">
 <section class="intro">
  <h1>{title}</h1>
  <p class="description">{description}</p>
 </section>

 <slot />
</div>

<style>
 .etude-doc {
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

 .description {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
 }
</style>
