export interface ActionOutcome {
	title: string;
	outcomes: {
		condition: string;
		action: string;
	}[];
}

export const DEFAULT_STEPS: ActionOutcome[] = [
	{
		title: 'Initial Diagonal Check',
		outcomes: [
			{
				condition: 'Same',
				action: 'Proceed to Step 3'
			},
			{
				condition: 'Different',
				action: 'Flip all tails to heads'
			}
		]
	},
	{
		title: 'Second Diagonal Check',
		outcomes: [
			{
				condition: 'Different',
				action: 'Flip the odd one to win'
			},
			{
				condition: 'Same',
				action: 'Flip both coins'
			}
		]
	},
	{
		title: 'State Verification',
		outcomes: [
			{
				condition: 'Different',
				action: 'Flip odd one to win'
			},
			{
				condition: 'Same',
				action: 'Flip one coin'
			}
		]
	},
	{
		title: 'Horizontal Alignment',
		outcomes: [
			{
				condition: 'Same',
				action: 'Puzzle solved'
			},
			{
				condition: 'Different',
				action: 'Diagonal position achieved'
			}
		]
	},
	{
		title: 'Final Resolution',
		outcomes: [
			{
				condition: 'Any state',
				action: 'Choose diagonal coins and flip both to win'
			}
		]
	}
];
