import Head from 'next/head';
import { Container, Flex } from '@chakra-ui/react';

import Navbar from './navbar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
	return (
		<Flex
			direction="column"
			className={styles.layout}
			bgGradient="linear(to-br, gray.100, gray.50)"
		>
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
			<Container
				flex="1"
				maxW="container.xl"
				p={0}
				backgroundColor="white"
				border="1px"
				borderColor="gray.300"
				borderRadius="md"
				shadow="base"
			>
				{children}
			</Container>
		</Flex>
	);
};

export default Layout;
