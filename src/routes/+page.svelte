<script lang="ts">
  import { onMount } from 'svelte';

  let wasmModule: WebAssembly.Instance;
  let input = 0;
  let result = 0;

  async function loadWasm() {
    const go = new Go();
    const result = await WebAssembly.instantiateStreaming(fetch('/main.wasm'), go.importObject);
    wasmModule = result.instance;
    go.run(wasmModule);
  }

  function calculateFibonacci() {
    if (window.fibonacciGo) {
      result = window.fibonacciGo(input);
    }
  }

  onMount(() => {
    loadWasm();
  });
</script>

<main>
  <h1>Fibonacci Calculator (Go + WebAssembly)</h1>
  <input type="number" bind:value={input} min="0" />
  <button on:click={calculateFibonacci}>Calculate</button>
  <p>Fibonacci({input}) = {result}</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
