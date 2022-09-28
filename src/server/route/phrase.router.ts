import { TRPCError } from '@trpc/server';
import dashify from 'dashify';

import {
	createPhraseSchema,
	updatePhraseSchema,
	getSinglePhraseSchema,
} from '@/schemas/phrase.schema';
import { createRouter } from '../createRouter';

export const phraseRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		return next();
	})
	.query('phrases', {
		async resolve({ ctx }) {
			const userId = ctx.session?.user.id;
			const phrases = await ctx.prisma.phrase.findMany({ where: { userId } });

			return phrases;
		},
	})
	.query('phrase', {
		input: getSinglePhraseSchema,
		async resolve({ ctx, input }) {
			const phrase = await ctx.prisma.phrase.findFirst({
				where: {
					OR: [
						{
							id: input.id,
						},
						{
							slug: input.slug,
						},
					],
				},
			});

			if (phrase === null) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}

			return phrase;
		},
	})
	.mutation('create-phrase', {
		input: createPhraseSchema,
		async resolve({ ctx, input }) {
			const { name, translations, explanations, examples } = input;
			const slug = dashify(name);
			const phrase = await ctx.prisma.phrase.create({
				data: {
					name,
					slug,
					translations,
					explanations,
					examples,
					user: {
						connect: {
							id: ctx.session?.user.id,
						},
					},
				},
			});

			return phrase;
		},
	})
	.mutation('update-phrase', {
		input: updatePhraseSchema,
		async resolve({ ctx, input }) {
			const { id, ...dataToUpdate } = input;
			const existedPhrase = ctx.prisma.phrase.findUnique({ where: { id } });

			if (existedPhrase === null) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}

			const updatedPhrase = ctx.prisma.phrase.update({
				where: { id },
				data: dataToUpdate,
			});

			return updatedPhrase;
		},
	});

export type PhraseRouter = typeof phraseRouter;
