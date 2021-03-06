import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
	Container,
	Flex,
	Box,
	Button,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import Navbar from './navbar';
import Breadcrumbs from './breadcrumbs';
import Auth, { forms } from './auth';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: session } = useSession();

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
				<Flex p={4} flexDir="row" justify="space-between" alignItems="center">
					{session ? (
						<>
							<Breadcrumbs />
							<Flex flexDir="row" justify="flex-end" alignItems="center">
								<Text>Signed in: {session.user?.email}</Text>
								<Button variant="link" ml={2} onClick={signOut}>
									Signed out
								</Button>
							</Flex>
						</>
					) : (
						<>
							<Button variant="link" onClick={onOpen}>
								Sign In
							</Button>
							<Auth
								isOpen={isOpen}
								initialForm={forms.signIn}
								onClose={onClose}
							/>
						</>
					)}
				</Flex>
				<Box flex="1">{children}</Box>
			</Container>
		</Flex>
	);
};

export default Layout;
