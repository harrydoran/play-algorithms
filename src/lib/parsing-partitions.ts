export enum LineType {
	Empty = 0,
	Comment = 1,
	Separator = 2,
	Partition = 3
}

export interface FormattedLine {
	value: string;
	lineType: LineType;
}

export interface ValidationResult {
	isValid: boolean;
	message: string;
}

export interface Scenario {
	lines: string[];
	valid: boolean;
}

class PartitionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'PartitionError';
	}
}

class DelimiterError extends PartitionError {
	constructor(line: string) {
		super(`Line contains mixed or invalid delimiters: ${line}`);
		this.name = 'DelimiterError';
	}
}

class CommentError extends PartitionError {
	constructor(line: string) {
		super(`Invalid comment format: ${line}`);
		this.name = 'CommentError';
	}
}

class SeparatorError extends PartitionError {
	constructor(line: string) {
		super(`Invalid separator format: ${line}`);
		this.name = 'SeparatorError';
	}
}

export const CONSTANTS = {
	SEPARATOR_STRING: '--------',
	INVALID_SCENARIO_MESSAGE: '# INVALID SCENARIO',
	COMMON_ERROR_MESSAGE: '# INVALID: %s',
	INVALID_LINE_ERROR_HELP: '#   REASON: Line contains unrecognised symbols'
} as const;

function isPartition(line: string): boolean {
	return /^[\d,\s]+$/.test(line.trim());
}

function isComment(line: string): boolean {
	return line.trim().startsWith('#');
}

function isEmpty(line: string): boolean {
	return line.trim() === '';
}

function isSeparator(line: string): boolean {
	return /^-+$/.test(line.trim());
}

function validatePartition(line: string): FormattedLine {
	const trimmed = line.trim();
	if (trimmed.includes(',') && trimmed.includes(' ')) {
		throw new DelimiterError(line);
	}

	const numbers = trimmed.split(/[,\s]+/).map(Number);
	if (numbers.some(isNaN)) {
		throw new PartitionError(`Invalid numbers in partition: ${line}`);
	}

	// Verify descending order
	for (let i = 1; i < numbers.length; i++) {
		if (numbers[i] > numbers[i - 1]) {
			throw new PartitionError(`Numbers must be in descending order: ${line}`);
		}
	}

	return {
		value: numbers.join(' '),
		lineType: LineType.Partition
	};
}

function validateComment(line: string): FormattedLine {
	const trimmed = line.trim();
	if (!trimmed.startsWith('#')) {
		throw new CommentError(line);
	}
	return {
		value: trimmed,
		lineType: LineType.Comment
	};
}

function validateSeparator(line: string): FormattedLine {
	const trimmed = line.trim();
	if (trimmed.length < 3) {
		throw new SeparatorError(line);
	}
	return {
		value: CONSTANTS.SEPARATOR_STRING,
		lineType: LineType.Separator
	};
}

export function validateLine(line: string): FormattedLine {
	if (isEmpty(line)) {
		return { value: '', lineType: LineType.Empty };
	}
	if (isComment(line)) {
		return validateComment(line);
	}
	if (isSeparator(line)) {
		return validateSeparator(line);
	}
	if (isPartition(line)) {
		return validatePartition(line);
	}
	throw new PartitionError(`Invalid line format: ${line}`);
}

export function validateAllLines(input: string): Scenario[] {
	const lines = input.split('\n');
	const scenarios: Scenario[] = [];
	let currentScenario: Scenario = { lines: [], valid: false };
	let onlyEmpty = true;
	let emptyLineSequence = 0;

	for (const line of lines) {
		try {
			const result = validateLine(line);

			if (result.lineType !== LineType.Empty && result.lineType !== LineType.Separator) {
				onlyEmpty = false;
			}

			if (result.lineType === LineType.Partition) {
				currentScenario.valid = true;
			}

			// Handle empty line compression
			if (result.lineType === LineType.Empty) {
				if (emptyLineSequence > 0) continue;
				emptyLineSequence++;
			} else {
				emptyLineSequence = 0;
			}

			// Handle scenario separation
			if (result.lineType === LineType.Separator) {
				if (currentScenario.lines.length > 0 && !onlyEmpty) {
					scenarios.push(currentScenario);
				}
				currentScenario = { lines: [], valid: false };
				onlyEmpty = true;
				continue;
			}

			if (result.value) {
				currentScenario.lines.push(result.value);
			}
		} catch (error) {
			if (error instanceof PartitionError) {
				currentScenario.lines.push(
					CONSTANTS.COMMON_ERROR_MESSAGE.replace('%s', line),
					CONSTANTS.INVALID_LINE_ERROR_HELP
				);
				onlyEmpty = false;
			}
		}
	}

	// Handle last scenario
	if (currentScenario.lines.length > 0 && !onlyEmpty) {
		scenarios.push(currentScenario);
	}

	return scenarios;
}
