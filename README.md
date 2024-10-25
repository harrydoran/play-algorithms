# Algorithm Visualizations

This is my completed work for COSC326 (Computational Problem Solving) at the University of Otago. I've built interactive visualizations for each étude (programming challenge) using Svelte and TypeScript, focusing on creating clear and engaging ways to understand the solutions.

## About

Each étude has its own interactive page that includes:
- Visual demonstrations of the solution
- Step-by-step explanations of my approach
- Detailed methodology and implementation notes
- Access to the original problem specifications

The interface is designed to be intuitive and educational, helping others understand both the problems and solutions.

## Development Setup

### Prerequisites
- Node.js (v18 or later recommended)
- npm (included with Node.js)

### Running Locally
```bash
# Install dependencies
npm install

# Start development server and open browser
npm run dev -- --open
```

### Project Structure
```
src/
├── lib/               # Shared utilities and components
│   ├── components/    # Reusable Svelte components
│   └── ...           # Algorithm implementations
├── routes/
│   └── etude/        # Individual étude pages
└── static/
    └── etude-specs/  # PDF specifications for each étude
```

### Technology Stack
- SvelteKit - Full-stack web framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first styling
- Lucide Icons - Icon library
