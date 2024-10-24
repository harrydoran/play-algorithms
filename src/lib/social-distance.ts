export interface GridPoint {
	row: number;
	col: number;
}

export interface GridData {
	rows: number;
	cols: number;
	people: GridPoint[];
}

export interface PathResult {
	min: number;
	total: number;
	path: GridPoint[];
}

export function parseInput(input: string): GridData {
	const lines = input.trim().split('\n');
	const [rows, cols] = lines[0].split(' ').map(Number);
	const people = lines.slice(1).map((line) => {
		const [row, col] = line.split(' ').map(Number);
		return { row, col };
	});
	return { rows, cols, people };
}

export class SocialGrid {
	private edges: GridPoint[][];
	private readonly size: number;

	constructor(
		private rows: number,
		private cols: number
	) {
		this.size = rows * cols;
		this.edges = Array(this.size)
			.fill(null)
			.map(() => []);
		this.initializeEdges();
	}

	private initializeEdges(): void {
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				const neighbors = this.getNeighbors(r, c);
				const current: GridPoint = { row: r, col: c };
				for (const neighbor of neighbors) {
					this.addEdge(current, neighbor);
				}
			}
		}
	}

	private getNeighbors(row: number, col: number): GridPoint[] {
		const neighbors: GridPoint[] = [];

		if (row > 0) neighbors.push({ row: row - 1, col });
		if (row < this.rows - 1) neighbors.push({ row: row + 1, col });
		if (col > 0) neighbors.push({ row, col: col - 1 });
		if (col < this.cols - 1) neighbors.push({ row, col: col + 1 });

		return neighbors;
	}

	private addEdge(p1: GridPoint, p2: GridPoint): void {
		const idx = this.pointToIndex(p1);
		this.edges[idx].push(p2);
	}

	private pointToIndex(p: GridPoint): number {
		return p.row * this.cols + p.col;
	}

	private indexToPoint(idx: number): GridPoint {
		const row = Math.floor(idx / this.cols);
		const col = idx % this.cols;
		return { row, col };
	}

	private manhattanDistance(p1: GridPoint, p2: GridPoint): number {
		return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col);
	}

	public findOptimalPath(people: GridPoint[]): PathResult {
		const path: GridPoint[] = [];

		// Start point
		path.push({ row: 0, col: 0 });

		let currentRow = 0;
		let currentCol = 0;

		// Find a route that tries to stay away from people
		const isSafePath = (r: number, c: number): boolean => {
			return !people.some(
				(p) => (p.row === r && p.col === c) || Math.abs(p.row - r) + Math.abs(p.col - c) < 2
			);
		};

		// Try to move right and down while avoiding people
		while (currentRow < this.rows - 1 || currentCol < this.cols - 1) {
			// Prefer moving right if it's safe
			if (currentCol < this.cols - 1 && isSafePath(currentRow, currentCol + 1)) {
				currentCol++;
				path.push({ row: currentRow, col: currentCol });
			}
			// Otherwise try moving down
			else if (currentRow < this.rows - 1 && isSafePath(currentRow + 1, currentCol)) {
				currentRow++;
				path.push({ row: currentRow, col: currentCol });
			}
			// If neither is safe, just move toward the goal
			else if (currentCol < this.cols - 1) {
				currentCol++;
				path.push({ row: currentRow, col: currentCol });
			} else if (currentRow < this.rows - 1) {
				currentRow++;
				path.push({ row: currentRow, col: currentCol });
			}
		}

		// Calculate actual distances based on the path
		let minDist = Number.MAX_VALUE;
		let totalDist = 0;

		for (const pathPoint of path) {
			for (const person of people) {
				const dist = this.manhattanDistance(pathPoint, person);
				minDist = Math.min(minDist, dist);
				totalDist += dist;
			}
		}

		return {
			min: minDist,
			total: Math.floor(totalDist / people.length),
			path
		};
	}
}

export function calculatePath(input: string): PathResult {
	const gridData = parseInput(input);
	const grid = new SocialGrid(gridData.rows, gridData.cols);
	return grid.findOptimalPath(gridData.people);
}
