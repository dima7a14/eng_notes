import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/layout';
import '../styles/globals.css';

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	);
}
