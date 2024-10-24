function findRemainingLetters(word: string, wordDict: string): string | null {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    const cleanWordDict = wordDict.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanWordDict.length > cleanWord.length) {
        return null;
    }

    const remainingLetters = cleanWord.split('');
    for (const c of cleanWordDict) {
        const index = remainingLetters.indexOf(c);
        if (index === -1) {
            return null;
        }
        remainingLetters.splice(index, 1);
    }

    return remainingLetters.join('');
}

export function findBestAnagram(
    input: string,
    dictionary: string[],
    output: string[] = []
): string[] | null {
    for (let i = 0; i < dictionary.length; i++) {
        const remainderOfInput = findRemainingLetters(input, dictionary[i]);
        if (remainderOfInput !== null) {
            if (remainderOfInput !== '') {
                const subAnagram = findBestAnagram(remainderOfInput, dictionary);
                if (!subAnagram) {
                    continue;
                }
                output.push(...subAnagram);
            }
            output.unshift(dictionary[i]); // Insert at beginning to maintain order
            return output;
        }
    }
    return null;
}

export function parseInput(input: string): { words: string[]; dictionary: string[] } {
    const [wordsSection, dictionarySection] = input.trim().split(/\n\s*\n/);

    const words = wordsSection
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);

    const dictionary = dictionarySection
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0)
        .sort((a, b) => {
            // Sort by length (descending) and then alphabetically
            if (a.length !== b.length) {
                return b.length - a.length;
            }
            return a.localeCompare(b);
        });

    return { words, dictionary };
}

export function formatOutput(word: string, anagram: string[] | null): string {
    return `${word}: ${anagram ? anagram.join(' ') : ''}`;
}
