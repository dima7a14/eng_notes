import bcrypt from 'bcrypt';

import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name, email, password } = req.body;

		try {
			// TODO: check email for uniqueness

			const hash = await bcrypt.hash(password, 0);

			await prisma.user.create({
				data: {
					name,
					email,
					password: hash,
				},
			});

			return res.status(200).end();
		} catch (err) {
			return res.status(503).json({ message: err.toString() });
		}
	} else {
		return res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` });
	}
}
