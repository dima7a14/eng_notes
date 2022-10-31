import z, { string } from 'zod';

export const createPhraseSchema = z.object({
	name: z
		.string()
		.min(3, 'Min name length is 3')
		.max(256, 'Max name length is 256'),
	translations: z.array(z.string()).nonempty(),
	explanations: z.array(z.string()),
	examples: z.array(z.string()),
});

export type CreatePhraseInput = z.TypeOf<typeof createPhraseSchema>;

export const updatePhraseSchema = z
	.object({
		id: string().uuid(),
	})
	.merge(createPhraseSchema.deepPartial());

export const getSinglePhraseSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID' }).optional(),
	slug: z
		.string()
		.trim()
		.min(3, 'Min slug length is 3')
		.max(256, 'Max slug length is 256')
		.optional(),
});

export const searchPhrasesSchema = z.object({
	search: z.string().trim().min(3, 'Min search string is 3'),
});
