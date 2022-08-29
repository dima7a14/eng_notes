import React, { ComponentType } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/layout';
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


export default App;
