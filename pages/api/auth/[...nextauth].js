import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';

import { prisma } from '../../../lib/prisma';

function confirmPasswordHash(plainPassword, hashedPassword) {
	return new Promise((resolved) => {
		bcrypt.compare(plainPassword, hashedPassword, (err, same) => {
			resolved(same);
		});
	});
}

let userAccount;

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Sign in with e-mail',
			credentials: {
				email: { label: 'E-mail', type: 'email', placeholder: 'Your e-mail' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Your password',
				},
			},
			async authorize(credentials, req) {
				try {
					const { email, password } = credentials;
					const user = await prisma.user.findUnique({
						where: { email },
					});

					if (user !== null) {
						const samePassword = await confirmPasswordHash(
							password,
							user.password,
						);

						if (samePassword) {
							userAccount = {
								id: user.id,
								name: user.name,
								email: user.email,
							};

							return userAccount;
						}

						throw new Error("Passwords don't match");
					}

					return null;
				} catch (err) {
					console.log('Authorize error:', err);
				}
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session({ session, token }) {
			if (token) {
				session.id = token.id;
			}

			return session;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/',
		signOut: '/',
		error: '/',
		verifyRequest: '/',
	},
});
