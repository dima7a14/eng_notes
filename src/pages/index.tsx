import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

import server from '@/consts/server';
import PhrasesList from '@/components/phrasesList';
import styles from '@/styles/Home.module.css';
import type { Phrase } from '@/models/phrase';
import { authOptions } from './api/auth/[...nextauth]';

export type HomeProps = {
	items: Phrase[];
};


const Home: React.FC<HomeProps> = ({ items = [] }) => {
	const { data: session } = useSession();

	return (
		<div className={styles.container}>
			<Head>
				<title>My English notes</title>
			</Head>

			<main className={styles.main}>
				{session && <PhrasesList items={items} />}
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

	let items = [];
	const response = await fetch(`${server}/api/phrases`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		items = await response.json();
	}

	return {
		props: { items },
	};
}
