import { SessionProvider as AuthProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<ChakraProvider>
			<AuthProvider session={session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
