interface RGB {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface Rectangle {
	min: { x: number; y: number };
	max: { x: number; y: number };
}

const MAX_IMG_SIZE = 1080;

export function indexOfPreviousPlacement(baseSequence: number): number {
	if (baseSequence <= 0) {
		return baseSequence;
	}
	return Math.floor((Math.pow(4, baseSequence - 1) - 1) / 3);
}

export function placeSquares(
	baseSequence: number,
	baseSquares: Rectangle[],
	size: number
): Rectangle[] {
	const squares = [...baseSquares];
	size *= 1000; // Avoid losing values to integer division

	if (baseSequence === 0 || baseSquares.length === 0) {
		squares.push({
			min: { x: -size / 2, y: -size / 2 },
			max: { x: size / 2, y: size / 2 }
		});
	}

	for (const sq of baseSquares.slice(indexOfPreviousPlacement(baseSequence))) {
		// Top left
		squares.push({
			min: { x: sq.min.x - size / 2, y: sq.min.y - size / 2 },
			max: { x: sq.min.x + size / 2, y: sq.min.y + size / 2 }
		});
		// Top right
		squares.push({
			min: { x: sq.max.x - size / 2, y: sq.min.y - size / 2 },
			max: { x: sq.max.x + size / 2, y: sq.min.y + size / 2 }
		});
		// Bottom left
		squares.push({
			min: { x: sq.min.x - size / 2, y: sq.max.y - size / 2 },
			max: { x: sq.min.x + size / 2, y: sq.max.y + size / 2 }
		});
		// Bottom right
		squares.push({
			min: { x: sq.max.x - size / 2, y: sq.max.y - size / 2 },
			max: { x: sq.max.x + size / 2, y: sq.max.y + size / 2 }
		});
	}

	return squares;
}

export function placeManySquares(scales: number[]): Rectangle[] {
	let squares: Rectangle[] = [];
	for (let i = 0; i < scales.length; i++) {
		squares = placeSquares(i, squares, scales[i]);
	}
	return squares;
}

export function parseInput(input: string): { scales: number[]; colors: RGB[] } {
	const lines = input.trim().split('\n');
	const scales: number[] = [];
	const colors: RGB[] = [];

	for (const line of lines) {
		// Skip empty lines and comments
		const trimmedLine = line.trim();
		if (trimmedLine === '' || trimmedLine.startsWith('#')) {
			continue;
		}

		// Remove inline comments
		const parts = trimmedLine.split('#')[0].trim().split(/\s+/);
		if (parts.length < 4) continue;

		const scale = parseFloat(parts[0]);
		if (isNaN(scale)) continue;

		const r = parseInt(parts[1], 10);
		const g = parseInt(parts[2], 10);
		const b = parseInt(parts[3], 10);
		if (isNaN(r) || isNaN(g) || isNaN(b)) continue;

		scales.push(scale);
		colors.push({ r, g, b, a: 255 });
	}

	// Normalize scales
	if (scales.length > 0) {
		const middleIndex = Math.floor(scales.length / 2);
		const middleScale = scales[middleIndex];
		const scaleFactor = 1.0 / middleScale;
		for (let i = 0; i < scales.length; i++) {
			scales[i] *= scaleFactor;
		}
	}

	return { scales, colors };
}

export function generateQuilt(
	ctx: CanvasRenderingContext2D,
	canvasSize: number,
	scales: number[],
	colors: RGB[]
): void {
	const squares = placeManySquares(scales);
	if (squares.length === 0) return;

	// Find maximum extent
	let maxExtent = 0;
	for (const sq of squares) {
		maxExtent = Math.max(
			maxExtent,
			Math.abs(sq.min.x),
			Math.abs(sq.max.x),
			Math.abs(sq.min.y),
			Math.abs(sq.max.y)
		);
	}

	const scaleRatio = canvasSize / 2 / maxExtent;

	// Clear canvas
	ctx.fillStyle = 'rgba(0, 0, 0, 0)';
	ctx.fillRect(0, 0, canvasSize, canvasSize);

	// Draw squares
	let layer = 1;
	for (let i = 0; i < squares.length; i++) {
		const sq = squares[i];
		const finalSquare = Math.floor((1 - Math.pow(4, layer)) / (1 - 4));
		if (i === finalSquare) {
			layer += 1;
		}

		const scaledRect = {
			x: canvasSize / 2 + sq.min.x * scaleRatio,
			y: canvasSize / 2 + sq.min.y * scaleRatio,
			width: (sq.max.x - sq.min.x) * scaleRatio,
			height: (sq.max.y - sq.min.y) * scaleRatio
		};

		// Only draw if square is at least 1 pixel
		if (scaledRect.width > 0 && scaledRect.height > 0) {
			const color = colors[layer - 1];
			ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
			ctx.fillRect(scaledRect.x, scaledRect.y, scaledRect.width, scaledRect.height);
		}
	}
}
