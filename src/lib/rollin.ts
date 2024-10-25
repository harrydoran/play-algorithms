// All possible partitions of indices 0-5 into two groups of three
const setIndices = [
	[
		[0, 1, 2],
		[3, 4, 5]
	],
	[
		[0, 1, 3],
		[2, 4, 5]
	],
	[
		[0, 1, 4],
		[2, 3, 5]
	],
	[
		[0, 1, 5],
		[2, 3, 4]
	],
	[
		[0, 2, 3],
		[1, 4, 5]
	],
	[
		[0, 2, 4],
		[1, 3, 5]
	],
	[
		[0, 2, 5],
		[1, 3, 4]
	],
	[
		[0, 3, 4],
		[1, 2, 5]
	],
	[
		[0, 3, 5],
		[1, 2, 4]
	],
	[
		[0, 4, 5],
		[1, 2, 3]
	]
];

// Check if three dice form a set (three of a kind or sequence)
export function isSet(indices: number[], dice: number[]): boolean {
	const a = dice[indices[0]];
	const b = dice[indices[1]];
	const c = dice[indices[2]];

	// All three dice the same is a set
	if (a === b && b === c) {
		return true;
	}

	// If not all three are the same, then any two the same is not a set
	if (a === b || a === c || b === c) {
		return false;
	}

	// If all three are different and largest minus smallest is 2 then it is a set
	const max = Math.max(a, Math.max(b, c));
	const min = Math.min(a, Math.min(b, c));
	return max - min === 2;
}

// Check if dice form two valid sets
export function isComplete(dice: number[]): boolean {
	for (const [set1, set2] of setIndices) {
		if (isSet(set1, dice) && isSet(set2, dice)) {
			return true;
		}
	}
	return false;
}

// Evaluate the current state of the dice
function evaluateDiceState(dice: number[], moves: number): number {
	const sortedDice = [...dice].sort((a, b) => a - b);
	let value = 0;

	// Evaluate three of a kind
	for (let i = 0; i < 4; i++) {
		if (sortedDice[i] === sortedDice[i + 1] && sortedDice[i + 1] === sortedDice[i + 2]) {
			value += 100 - moves;
		}
	}

	// Evaluate sequences
	for (let i = 0; i < 4; i++) {
		if (sortedDice[i] + 1 === sortedDice[i + 1] && sortedDice[i + 1] + 1 === sortedDice[i + 2]) {
			value += 100 - moves;
		}
	}

	// Evaluate pairs and partial sequences
	for (let i = 0; i < 5; i++) {
		if (sortedDice[i] === sortedDice[i + 1]) {
			value += 10 - moves;
		}
		if (i < 4 && sortedDice[i] + 1 === sortedDice[i + 1]) {
			value += 5 - moves;
		}
	}

	return value;
}

// Handle a new roll and decide which die to replace
export function handleRoll(roll: number, dice: number[]): number {
	let bestValue = Number.MIN_SAFE_INTEGER;
	let bestIndex = -1;

	for (let i = 0; i < dice.length; i++) {
		const potentialDice = [...dice];
		potentialDice[i] = roll;
		const value = evaluateDiceState(potentialDice, 0);

		if (value > bestValue) {
			bestValue = value;
			bestIndex = i;
		}
	}

	return bestIndex;
}
