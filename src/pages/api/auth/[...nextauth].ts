import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '../../../lib/prisma';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_URL,
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;

			return session;
		},
	},
};

export default NextAuth(authOptions);
