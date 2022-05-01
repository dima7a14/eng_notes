import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { slug } = req.query;

		const phrase = await prisma.phrase.findUnique({
			where: { slug },
		});

		res.status(200).json(phrase);
	} else {
		res.setHeader('Allow', ['GET']);
		res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported` });
	}
}
