import { error } from '@sveltejs/kit';

const etudes = [
	{
		title: 'Parsing Partitions',
		description:
			'Note on I/O handling (applies quite generally to many etudes) and also a note on a possible program architecture.',
		etudeNumber: '01',
		slug: 'parsing-partitions'
	}
	// ... other etudes ...
];

export function load({ params }) {
	const etude = etudes.find((e) => e.slug === params.slug);

	if (etude) {
		return etude;
	}

	throw error(404, 'Etude not found');
}
