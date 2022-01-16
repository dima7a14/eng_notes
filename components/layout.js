import Head from 'next/head';
import { Container, Box } from '@chakra-ui/react';

import Navbar from './navbar';

const Layout = ({ children }) => {
	return (
		<Box bgGradient="linear(to-br, gray.200, gray.50)">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Personal web-app for English learning"
				/>
				<link rel="icon" href="/favicon.ico" />
				<title>English notes</title>
			</Head>
			<Navbar />
			<Container maxW="container.xl">{children}</Container>
		</Box>
	);
};

export default Layout;
