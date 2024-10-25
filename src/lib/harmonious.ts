export function calculateSumOfProperDivisors(limit: number): number[] {
	const sums: number[] = new Array(limit * 10 + 1).fill(0);

	// Calculate sums excluding 1 as per great aunt Maude's rules
	for (let i = 2; i <= limit * 10; i++) {
		for (let j = 2 * i; j <= limit * 10; j += i) {
			sums[j] += i;
		}
	}

	return sums;
}

export function findHarmoniousPairs(limit: number): [number, number][] {
	const harmoniousPairs: [number, number][] = [];
	const sums = calculateSumOfProperDivisors(limit);

	for (let a = 2; a <= limit; a++) {
		const b = sums[a];
		if (b > a && sums[b] === a) {
			harmoniousPairs.push([a, b]);
		}
	}

	return harmoniousPairs;
}

export function formatPairs(pairs: [number, number][]): string {
	return pairs.map(([a, b]) => `${a} ${b}`).join('\n');
}

export function validateLimit(input: string): number {
	const limit = parseInt(input);
	if (isNaN(limit) || limit < 1) {
		throw new Error('Limit must be a positive number');
	}
	return limit;
}

// Constants
export const DefaultMaxNum = 2000000;
export const AchievedMaxNum = 100000;

export function benchmarkTime(fn: () => void): number {
	const startTime = performance.now();
	fn();
	return (performance.now() - startTime) / 1000; // Convert to seconds
}
