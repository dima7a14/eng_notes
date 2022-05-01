import Head from 'next/head';
import { Container, Flex, Box, Button, Text } from '@chakra-ui/react';

import Navbar from './navbar';
import Breadcrumbs from './breadcrumbs';
import styles from '../styles/Layout.module.css';

const Layout = ({ user, children }) => {
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
				display="flex"
				flexDir="column"
				justifyContent="center"
				flexWrap="nowrap"
			>
				{user && (
					<Flex p={4} flexDir="row" justify="space-between" alignItems="center">
						<Breadcrumbs />
						<Flex flexDir="row" justify="flex-end" alignItems="center">
							<Text>Signed in: {user.email}</Text>
							<Button variant="link" ml={2} onClick={() => {}}>
								Signed out
							</Button>
						</Flex>
					</Flex>
				)}
				<Box flex="1">{children}</Box>
			</Container>
		</Flex>
	);
};

export default Layout;
