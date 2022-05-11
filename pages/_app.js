import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<SessionProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</ChakraProvider>
	);
}

export default MyApp;
