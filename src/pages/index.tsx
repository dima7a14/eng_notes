import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

import PhrasesList from '@/components/phrasesList';
import styles from '@/styles/Home.module.css';
import { authOptions } from './api/auth/[...nextauth]';

const Home: React.FC = () => {
	const { data: session } = useSession();

	return (
		<div className={styles.container}>
			<Head>
				<title>My English notes</title>
			</Head>

			<main className={styles.main}>
				{session && <PhrasesList />}
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions,
	);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
			},
		};
	}

	return {
		props: {},
	};
}
