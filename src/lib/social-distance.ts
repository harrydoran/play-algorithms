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
	const validLines = lines.filter((line) => !line.trim().startsWith('#') && line.trim() !== '');

	if (validLines.length < 1) throw new Error('Invalid input: No valid dimensions line found');

	const [rows, cols] = validLines[0].split(/\s+/).map(Number);
	if (isNaN(rows) || isNaN(cols) || rows < 2 || cols < 2) {
		throw new Error('Invalid input: Grid dimensions must be valid numbers >= 2');
	}

	const people = validLines.slice(1).map((line) => {
		const [row, col] = line.split(/\s+/).map(Number);
		if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= rows || col >= cols) {
			throw new Error('Invalid input: Person coordinates must be within grid bounds');
		}
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
		const visited = new Set<string>();

		// Helper to create point key for visited set
		const pointKey = (p: GridPoint) => `${p.row},${p.col}`;

		// Calculate distance score for a position
		const getDistanceScore = (p: GridPoint): number => {
			let minDist = Number.MAX_VALUE;
			let totalDist = 0;
			for (const person of people) {
				const dist = this.manhattanDistance(p, person);
				minDist = Math.min(minDist, dist);
				totalDist += dist;
			}
			return minDist * 1000 + totalDist; // Prioritize minimum distance
		};

		// Priority queue for Dijkstra-like algorithm
		const queue = new PriorityQueue<{
			point: GridPoint;
			score: number;
			path: GridPoint[];
		}>((a, b) => b.score - a.score);

		// Start from (0,0)
		queue.push({
			point: { row: 0, col: 0 },
			score: getDistanceScore({ row: 0, col: 0 }),
			path: [{ row: 0, col: 0 }]
		});

		while (!queue.isEmpty()) {
			const current = queue.pop()!;
			const key = pointKey(current.point);

			if (visited.has(key)) continue;
			visited.add(key);

			// Check if we reached the goal
			if (current.point.row === this.rows - 1 && current.point.col === this.cols - 1) {
				let minDist = Number.MAX_VALUE;
				let totalDist = 0;
				for (const pathPoint of current.path) {
					for (const person of people) {
						const dist = this.manhattanDistance(pathPoint, person);
						minDist = Math.min(minDist, dist);
						totalDist += dist;
					}
				}
				return {
					min: minDist,
					total: Math.floor(totalDist / people.length),
					path: current.path
				};
			}

			// Get valid neighbors
			const neighbors = this.getNeighbors(current.point.row, current.point.col);
			for (const neighbor of neighbors) {
				if (!visited.has(pointKey(neighbor))) {
					const score = getDistanceScore(neighbor);
					queue.push({
						point: neighbor,
						score: score,
						path: [...current.path, neighbor]
					});
				}
			}
		}

		// No path found (shouldn't happen in this case)
		return {
			min: 0,
			total: 0,
			path: []
		};
	}
}

// Priority Queue implementation
class PriorityQueue<T> {
	private items: T[] = [];
	constructor(private compare: (a: T, b: T) => number) {}

	push(item: T) {
		this.items.push(item);
		this.items.sort(this.compare);
	}

	pop(): T | undefined {
		return this.items.shift();
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}
}

export function calculatePath(input: string): PathResult {
	const gridData = parseInput(input);
	const grid = new SocialGrid(gridData.rows, gridData.cols);
	return grid.findOptimalPath(gridData.people);
}
