import type { Phrase } from '@/models/phrase';

const phrases: Phrase[] = [
	{
		name: 'to devote',
		translations: ['присвятити'],
		explanations: ['to spend focused time doing something'],
		examples: [
			'She devoted herself to serving God.',
			'We devote five full days a month to training.',
		],
		userId: '1',
	},
	{
		name: 'to eat up',
		translations: ["з'їсти", 'доїсти'],
		explanations: ['to eat something entirely'],
		examples: ['Is something eating her up? She seems worried.'],
		userId: '1',
	},
	{
		name: 'enchilada',
		translations: ["млинець з гострою м'ясною начинкою"],
		explanations: [],
		examples: [],
		userId: '1',
	},
	{
		name: 'abysmal',
		translations: ['жахливий', 'глибокий'],
		explanations: [],
		examples: [
			'I always said his taste was abysmal.',
			'The reunion was an abysmal failure.',
		],
		userId: '1',
	},
	{
		name: 'To usher in',
		translations: ['Ввести, оголошувати'],
		explanations: [],
		examples: [
			'to user in a new era',
			'the Viennese usher in the New Year with a concert of music by Strauss',
		],
		userId: '1',
	},
];

export default phrases;
