import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import dashify from 'dashify';

import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ message: 'Not authenticated' });
		return;
	}

	if (req.method === 'GET') {
		const userId = session.user.id;

		const phrases = await prisma.phrase.findMany({
			where: { userId },
		});

		res.status(200).json(JSON.parse(JSON.stringify(phrases)));
	} else if (req.method === 'POST') {
		const { name, translations, explanations, examples } = req.body;
		const slug = dashify(name);
		const phrase = await prisma.phrase.create({
			data: {
				name,
				slug,
				translations,
				explanations,
				examples,
				user: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});

		res.status(200).json(JSON.parse(JSON.stringify(phrase)));
	} else {
		res.setHeader('Allow', ['GET', 'POST']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}
