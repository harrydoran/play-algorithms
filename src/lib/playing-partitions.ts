export interface Scenario {
    base: number[];
    targets: number[][];
}

export interface Gamebook {
    win: Map<string, number[]>;
    lose: Map<string, number[]>;
    draw: Map<string, number[]>;
}

export function translateCol(partition: number[], index: number): number[] {
    if (partition.length <= 0 || index >= partition.length) {
        return [];
    }

    const newPartition = [...partition];
    newPartition[index] = 0;

    // Sort and remove trailing zeros
    newPartition.sort((a, b) => b - a);
    while (newPartition[newPartition.length - 1] === 0) {
        newPartition.pop();
    }

    // Add +1 from partition[index]
    let count = 0;
    for (let translateSize = partition[index]; translateSize > 0; translateSize--) {
        if (count > newPartition.length - 1) {
            newPartition.push(1);
        } else {
            newPartition[count] += 1;
        }
        count += 1;
    }

    return newPartition.sort((a, b) => b - a);
}

export function availableReverseMoves(partition: number[]): number[][] {
    if (partition.length === 0) return [];

    const uniqueMoves = new Map<string, number[]>();
    for (let i = 0; i < partition.length; i++) {
        const move = translateCol(partition, i);
        const moveKey = JSON.stringify(move);
        if (!uniqueMoves.has(moveKey)) {
            uniqueMoves.set(moveKey, move);
        }
    }

    return Array.from(uniqueMoves.values());
}

export function translateRow(partition: number[], index: number): number[] {
    if (partition.length < 1 || index >= partition.length) {
        return [];
    }

    const newPartition = [...partition];

    for (let i = index; i >= 0; i--) {
        newPartition[i] -= 1;
    }

    newPartition.push(index + 1);

    // Sort and remove zeros
    return newPartition
        .sort((a, b) => b - a)
        .filter(n => n > 0);
}

export function availableMoves(partition: number[]): number[][] {
    const moves: number[][] = [];
    const deltas: number[] = [];

    for (let i = 0; i < partition.length - 1; i++) {
        deltas.push(partition[i] - partition[i + 1]);
    }
    deltas.push(partition[partition.length - 1]);

    deltas.forEach((d, i) => {
        if (d !== 0) {
            moves.push(translateRow(partition, i));
        }
    });

    return moves;
}

export function generateSets(targets: number[][]): Gamebook {
    const lose = new Map<string, number[]>();
    const win = new Map<string, number[]>();
    const draw = new Map<string, number[]>();
    let queue: number[][] = [...targets];

    // Initialize targets as losing positions
    targets.forEach(target => {
        lose.set(JSON.stringify(target), target);
    });

    let currentDepth = 0;
    let currentClassification = "lose";

    while (queue.length > 0) {
        const nextQueue: number[][] = [];

        for (const currentPartition of queue) {
            const moves = availableReverseMoves(currentPartition);

            for (const move of moves) {
                const moveKey = JSON.stringify(move);
                const currentKey = JSON.stringify(currentPartition);

                if (currentClassification === "lose") {
                    if (!win.has(moveKey) && moveKey !== currentKey) {
                        if (!lose.has(moveKey)) {
                            win.set(moveKey, move);
                            nextQueue.push(move);
                        }
                    }
                } else {
                    if (!lose.has(moveKey) && moveKey !== currentKey) {
                        if (!win.has(moveKey)) {
                            // Check for draw
                            let isDraw = false;
                            const forwardMoves = availableMoves(move);
                            for (const v of forwardMoves) {
                                if (!win.has(JSON.stringify(v))) {
                                    draw.set(moveKey, move);
                                    isDraw = true;
                                    break;
                                }
                            }
                            if (!isDraw) {
                                lose.set(moveKey, move);
                                nextQueue.push(move);
                            }
                        }
                    }
                }
            }
        }

        queue = nextQueue;
        currentDepth++;
        currentClassification = currentClassification === "lose" ? "win" : "lose";
    }

    return { win, lose, draw };
}

export function parseInput(input: string): Scenario[] {
    const scenarios: Scenario[] = [];
    let currentScenario: string[] = [];

    const lines = input.trim().split('\n');
    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
            continue;
        }

        if (trimmedLine.startsWith('-')) {
            if (currentScenario.length > 0) {
                scenarios.push(parseScenario(currentScenario));
                currentScenario = [];
            }
        } else {
            currentScenario.push(trimmedLine);
        }
    }

    if (currentScenario.length > 0) {
        scenarios.push(parseScenario(currentScenario));
    }

    return scenarios;
}

function parseScenario(lines: string[]): Scenario {
    const base = lines[0].split(/\s+/).map(Number);
    const targets = lines.slice(2).map(line =>
        line.split(/\s+/).map(Number).sort((a, b) => b - a)
    );
    return { base, targets };
}

export function analyzeScenario(scenario: Scenario): string {
    const gamebook = generateSets(scenario.targets);
    const baseKey = JSON.stringify(scenario.base);

    if (gamebook.win.has(baseKey)) return 'WIN';
    if (gamebook.lose.has(baseKey)) return 'LOSE';
    return 'DRAW';
}
