import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { inferAsyncReturnType } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function createContext({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	const session = await unstable_getServerSession(req, res, authOptions);

	return { req, res, prisma, session };
}

export type Context = inferAsyncReturnType<typeof createContext>;
