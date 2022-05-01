import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const phrases = await prisma.phrase.findMany();

		res.status(200).json(JSON.parse(JSON.stringify(phrases)));
	} else if (req.method === 'POST') {
		const { name, slug, translations, explanations, examples } = req.body;
		const phrase = await prisma.phrase.create({
			data: {
				name,
				slug,
				translations,
				explanations,
				examples,
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
