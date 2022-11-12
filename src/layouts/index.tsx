import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Flex } from '@chakra-ui/react';

import Navbar from '../components/navbar';
import { PhrasesLayout } from './phrasesLayout';
import { UnauthenticatedLayout } from './unauthenticatedLayout';

import styles from '../styles/Layout.module.css';

export const Layout: React.FC = ({ children }) => {
	const { data: session } = useSession();

	return (
		<Flex
			direction="column"
			className={styles.layout}
			bgGradient="linear(to-br, gray.100, gray.50)"
			px={2}
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
			{session ? (
				<PhrasesLayout>{children}</PhrasesLayout>
			) : (
				<UnauthenticatedLayout>{children}</UnauthenticatedLayout>
			)}
		</Flex>
	);
};
