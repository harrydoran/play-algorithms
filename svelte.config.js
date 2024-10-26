import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	},
	paths: {
		base: '/playalgorithms'
		// Optional: If you want to keep the base during development, remove this line
		// If you keep it, add: process.env.NODE_ENV === 'production' ? '/playalgorithms' : ''
	}
};

export default config;
