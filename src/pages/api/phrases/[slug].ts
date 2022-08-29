import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '../../../lib/prisma';

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
		const slug: string = (req.query.slug as string) ?? null;

		if (!slug) {
			res.status(422).json({ message: 'No slug' });
			return;
		}

		// TODO: add error handler
		const phrase = await prisma.phrase.findUnique({
			where: { slug },
		});

		if (phrase === null) {
			res.status(404).json({ message: 'Phrase not found' });
			return;
		}

		res.status(200).json(phrase);
	} else {
		res.setHeader('Allow', ['GET']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported` });
	}
}
