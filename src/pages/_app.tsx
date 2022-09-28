import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { withTRPC } from '@trpc/next';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';

import Layout from '../components/layout';
import type { AppRouter } from '@/server/route/app.router';
import { theme } from '../styles/theme';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	);


export default withTRPC<AppRouter>({
	config({ ctx }) {
		const url = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
			: 'http://localhost:3000/api/trpc';

		const links = [
			loggerLink(),
			httpBatchLink({
				maxBatchSize: 10,
				url,
			}),
		];

		return {
			queryClientConfig: {
				defaultOptions: {
					queries: {
						staleTime: 60,
					},
				},
			},
			headers() {
				if (ctx?.req) {
					return {
						...ctx.req.headers,
						'x-ssr': '1', // request is done on the server
					}
				}

				return {};
			},
			links,
			transformer: superjson,
		};
	},
	ssr: false, // TODO: tweak this
})(App);
