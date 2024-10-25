export interface SolutionStep {
	title: string;
	description: string;
	example?: string;
}

export const DEFAULT_STEPS: SolutionStep[] = [
	{
		title: 'Initial Setup',
		description: 'Start with a peg in the middle of a large board of holes',
		example: '00000100000'
	},
	{
		title: 'Forward Pattern Search',
		description: 'Scan the board for the substring "100". If found, change to "011"'
	},
	{
		title: 'Reverse Pattern Search',
		description: 'If "100" not found, look for "001" and change to "110"'
	},
	{
		title: 'State Generation',
		description:
			'Repeat the process, exploring all possible states leading back to solvable configurations'
	},
	{
		title: 'Solution Verification',
		description:
			'Check if current board contains 20 pegs, terminate branch and add to winnable states if true'
	}
];
