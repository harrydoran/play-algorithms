interface State {
    partition: number[];
    moves: number;
    steps: number[][];
}

interface Scenario {
    basePartition: number[];
    targetPartition: number[];
}

function deepEqual(x: number[], y: number[]): boolean {
    if (x.length !== y.length) {
        return false;
    }
    return x.every((val, idx) => val === y[idx]);
}

function translateRow(partition: number[], index: number): number[] {
    if (partition.length < 1 || index >= partition.length) {
        return [];
    }

    const newPartition = [...partition];

    for (let i = index; i >= 0; i--) {
        newPartition[i] -= 1;
    }

    newPartition.push(index + 1);

    // Sort in descending order
    newPartition.sort((a, b) => b - a);

    // Remove trailing zeros
    const firstZeroIndex = newPartition.findIndex(n => n === 0);
    return firstZeroIndex === -1 ? newPartition : newPartition.slice(0, firstZeroIndex);
}

function availableMoves(partition: number[]): number[][] {
    const availableMoves: number[][] = [];
    const deltas: number[] = [];

    for (let i = 0; i < partition.length - 1; i++) {
        deltas.push(partition[i] - partition[i + 1]);
    }
    deltas.push(partition[partition.length - 1]);

    for (let i = 0; i < deltas.length; i++) {
        if (deltas[i] !== 0) {
            const move = translateRow(partition, i);
            availableMoves.push(move);
        }
    }

    return availableMoves;
}

function sumPartition(partition: number[]): number {
    return partition.reduce((sum, val) => sum + val, 0);
}

export function movesToComplete(partition: number[], endState: number[]): { count: number; steps: number[][] } | null {
    const visited = new Set<string>();
    const queue: State[] = [{ partition, moves: 0, steps: [partition] }];

    if (sumPartition(partition) !== sumPartition(endState)) {
        return null;
    }

    while (queue.length > 0) {
        const current = queue.shift()!;

        if (deepEqual(current.partition, endState)) {
            return { count: current.moves, steps: current.steps };
        }

        const currentKey = JSON.stringify(current.partition);
        if (visited.has(currentKey)) {
            continue;
        }
        visited.add(currentKey);

        const allMoves = availableMoves(current.partition);
        for (const move of allMoves) {
            const moveKey = JSON.stringify(move);
            if (!visited.has(moveKey)) {
                const newSteps = [...current.steps, move];
                queue.push({ partition: move, moves: current.moves + 1, steps: newSteps });
            }
        }
    }

    return null;
}

export function parseInput(input: string): Scenario[] {
    const scenarios: Scenario[] = [];
    let currentScenario: string[] = [];

    const lines = input.split('\n');
    for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip empty lines and comments
        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
            continue;
        }

        // New scenario delimiter
        if (trimmedLine.startsWith('-')) {
            if (currentScenario.length === 2) {
                scenarios.push({
                    basePartition: parsePartition(currentScenario[0]),
                    targetPartition: parsePartition(currentScenario[1])
                });
            }
            currentScenario = [];
        } else {
            currentScenario.push(trimmedLine);
        }
    }

    // Handle last scenario
    if (currentScenario.length === 2) {
        scenarios.push({
            basePartition: parsePartition(currentScenario[0]),
            targetPartition: parsePartition(currentScenario[1])
        });
    }

    return scenarios;
}

function parsePartition(line: string): number[] {
    return line
        .trim()
        .split(/\s+/)
        .map(num => parseInt(num, 10))
        .filter(num => !isNaN(num))
        .sort((a, b) => b - a);
}

export function formatPartition(partition: number[]): string {
    return partition.join(' ');
}
