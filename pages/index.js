import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

import server from '../consts/server';
import { authOptions } from './api/auth/[...nextauth]';
import PhrasesList from '../components/phrasesList';
import styles from '../styles/Home.module.css';

export default function Home({ items }) {
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
}

export async function getServerSideProps(context) {
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
