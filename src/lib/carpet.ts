export class CarpetPiece {
    private matches = new Set<CarpetPiece>();
    private noMatches = new Set<CarpetPiece>();
    private reversalMapMatch = new Map<CarpetPiece, boolean>();
    private reversalMapNoMatch = new Map<CarpetPiece, boolean>();

    constructor(private strip: string) {
        this.strip = strip.toLowerCase();
    }

    getStrip(): string {
        return this.strip;
    }

    shouldReverseMatch(other: CarpetPiece): boolean {
        return this.reversalMapMatch.get(other) || false;
    }

    shouldReverseNoMatch(other: CarpetPiece): boolean {
        return this.reversalMapNoMatch.get(other) || false;
    }

    piecesDoNotMatch(other: CarpetPiece): boolean {
        return this.noMatches.has(other);
    }

    checkMatch(other: CarpetPiece): void {
        const reversedOther = other.strip.split('').reverse().join('');

        const exactMatchForward = this.strip === other.strip;
        const exactMatchBackward = this.strip === reversedOther;
        let noMatchFoundForward = true;
        let noMatchFoundBackward = true;

        for (let i = 0; i < this.strip.length; i++) {
            if (this.strip[i] === other.strip[i]) {
                noMatchFoundForward = false;
            }
            if (this.strip[i] === reversedOther[i]) {
                noMatchFoundBackward = false;
            }
            if (!noMatchFoundForward && !noMatchFoundBackward) {
                break;
            }
        }

        if (exactMatchForward || exactMatchBackward) {
            this.matches.add(other);
        }

        if (noMatchFoundForward || noMatchFoundBackward) {
            const shouldReverse = !noMatchFoundForward;
            this.reversalMapNoMatch.set(other, shouldReverse);
            this.noMatches.add(other);
        }

        this.reversalMapMatch.set(other, this.shouldReverse(other));
    }

    private shouldReverse(other: CarpetPiece): boolean {
        let forwardScore = 0;
        let backwardScore = 0;
        const piece2Reversed = other.getStrip().split('').reverse().join('');

        for (let i = 0; i < this.strip.length; i++) {
            if (this.strip[i] === other.strip[i]) {
                forwardScore++;
            }
            if (this.strip[i] === piece2Reversed[i]) {
                backwardScore++;
            }
        }
        return backwardScore > forwardScore;
    }
}

export function normalizeStrip(strip: string): string {
    const reversed = strip.split('').reverse().join('');
    return strip.localeCompare(reversed) <= 0 ? strip : reversed;
}

export function calculateScore(carpet: string[]): number {
    let score = 0;
    for (let i = 0; i < carpet.length - 1; i++) {
        const piece1 = carpet[i];
        const piece2 = carpet[i + 1];
        for (let j = 0; j < piece1.length; j++) {
            if (piece1[j] === piece2[j]) {
                score++;
            }
        }
    }
    return score;
}

export function calculateBalance(carpet: string[]): number {
    let matches = 0;
    let noMatches = 0;
    for (let i = 0; i < carpet.length - 1; i++) {
        const piece1 = carpet[i];
        const piece2 = carpet[i + 1];
        for (let j = 0; j < piece1.length; j++) {
            if (piece1[j] === piece2[j]) {
                matches++;
            } else {
                noMatches++;
            }
        }
    }
    return Math.abs(matches - noMatches);
}

interface CarpetResult {
    carpet: string[];
    score?: number;
    balance?: number;
}

export function makeCarpet(input: string, size: number, mode: string): CarpetResult | null {
    const pieces = new Map<string, number>();

    // Parse input and create pieces
    const lines = input.trim().split('\n');
    for (const line of lines) {
        const strip = normalizeStrip(line.trim());
        pieces.set(strip, (pieces.get(strip) || 0) + 1);
    }

    // Convert to CarpetPiece objects
    const carpetPieces = new Map<CarpetPiece, number>();
    pieces.forEach((count, strip) => {
        const piece = new CarpetPiece(strip);
        carpetPieces.set(piece, count);
    });

    // Check matches between all pieces
    for (const piece of carpetPieces.keys()) {
        for (const other of carpetPieces.keys()) {
            piece.checkMatch(other);
        }
    }

    let result: string[] = [];

    switch (mode) {
        case '-m':
            result = findMostMatches(carpetPieces, size);
            if (result.length > 0) {
                return { carpet: result, score: calculateScore(result) };
            }
            break;

        case '-n':
            result = findNoMatches(carpetPieces, size);
            if (result.length > 0) {
                return { carpet: result };
            }
            break;

        case '-b':
            result = findBalancedMatches(carpetPieces, size);
            if (result.length > 0) {
                return { carpet: result, balance: calculateBalance(result) };
            }
            break;
    }

    return null;
}

function findMostMatches(stock: Map<CarpetPiece, number>, size: number): string[] {
    let bestScore = 0;
    let bestCarpet: string[] = [];

    function backtrack(current: string[], remaining: Map<CarpetPiece, number>) {
        if (current.length === size) {
            const score = calculateScore(current);
            if (score > bestScore) {
                bestScore = score;
                bestCarpet = [...current];
            }
            return;
        }

        remaining.forEach((count, piece) => {
            if (count > 0) {
                const newRemaining = new Map(remaining);
                newRemaining.set(piece, count - 1);

                current.push(piece.getStrip());
                backtrack(current, newRemaining);
                current.pop();

                // Try reversed
                const reversed = piece.getStrip().split('').reverse().join('');
                current.push(reversed);
                backtrack(current, newRemaining);
                current.pop();
            }
        });
    }

    backtrack([], stock);
    return bestCarpet;
}

function findNoMatches(stock: Map<CarpetPiece, number>, size: number): string[] {
    let solution: string[] = [];

    function backtrack(current: string[], remaining: Map<CarpetPiece, number>): boolean {
        if (current.length === size) {
            solution = [...current];
            return true;
        }

        for (const [piece, count] of remaining) {
            if (count > 0 && (current.length === 0 || !hasMatches(current[current.length - 1], piece.getStrip()))) {
                const newRemaining = new Map(remaining);
                newRemaining.set(piece, count - 1);

                current.push(piece.getStrip());
                if (backtrack(current, newRemaining)) return true;
                current.pop();

                // Try reversed
                const reversed = piece.getStrip().split('').reverse().join('');
                if (!hasMatches(current[current.length - 1], reversed)) {
                    current.push(reversed);
                    if (backtrack(current, newRemaining)) return true;
                    current.pop();
                }
            }
        }
        return false;
    }

    backtrack([], stock);
    return solution;
}

function findBalancedMatches(stock: Map<CarpetPiece, number>, size: number): string[] {
    let bestBalance = Infinity;
    let bestCarpet: string[] = [];
    const maxAttempts = 3000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const current: string[] = [];
        const remaining = new Map(stock);

        while (current.length < size && remaining.size > 0) {
            const pieces = Array.from(remaining.entries());
            const [piece, count] = pieces[Math.floor(Math.random() * pieces.length)];

            if (Math.random() < 0.5) {
                current.push(piece.getStrip());
            } else {
                current.push(piece.getStrip().split('').reverse().join(''));
            }

            if (count === 1) {
                remaining.delete(piece);
            } else {
                remaining.set(piece, count - 1);
            }
        }

        if (current.length === size) {
            const balance = calculateBalance(current);
            if (balance < bestBalance) {
                bestBalance = balance;
                bestCarpet = [...current];
            }
        }
    }

    return bestCarpet;
}

function hasMatches(piece1: string, piece2: string): boolean {
    for (let i = 0; i < piece1.length; i++) {
        if (piece1[i] === piece2[i]) return true;
    }
    return false;
}
