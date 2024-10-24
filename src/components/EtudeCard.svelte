<script lang="ts">
 export let title: string;
</script>

<div class="etude-card">
 <h3>{title}</h3>
 <slot />
</div>

<style>
 .etude-card {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 6px;
 }

 h3 {
  color: #555;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
 }
</style>
