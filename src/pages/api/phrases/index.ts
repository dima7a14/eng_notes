import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';
import type { Phrase } from '@/models/phrase';
import type { CommonError } from '@/models/error';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = getSession();

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' });
		return;
	}

	if (req.method === 'GET') {
		const phrases = await prisma.phrase.findMany();

		res.status(200).json(JSON.parse(JSON.stringify(phrases)));
	} else if (req.method === 'POST') {
		res.status(201).json({ message: 'Ok' });
		const { name, slug, translations, explanations, examples } = req.body;
		// const phrase = await prisma.phrase.create({
		// 	data: {
		// 		name,
		// 		slug,
		// 		translations,
		// 		explanations,
		// 		examples,
		// 	},
		// });

		// res.status(200).json(JSON.parse(JSON.stringify(phrase)));
	} else {
		res.setHeader('Allow', ['GET', 'POST']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}
