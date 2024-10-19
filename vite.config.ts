import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['.'],
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  build: {
    target: 'esnext',
  },
  assetsInclude: ['**/*.wasm'],
});
