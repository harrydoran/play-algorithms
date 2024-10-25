export interface Rule {
	currentColor: string;
	directions: string;
	newColors: string;
}

export const DEFAULT_RULES = [
	{ currentColor: 'w', directions: 'ESWN', newColors: 'bbbb' },
	{ currentColor: 'b', directions: 'WNES', newColors: 'wwww' }
] as const;

export function createEmptyRule(): Rule {
	return { currentColor: '', directions: '', newColors: '' };
}
