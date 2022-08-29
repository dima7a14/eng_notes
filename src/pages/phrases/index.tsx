import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';

import server from '@/consts/server';
import PhrasesList from '@/components/phrasesList';
import { Phrase } from '@/models/phrase';
import { authOptions } from '../api/auth/[...nextauth]';

export type PhrasesProps = {
	items: Phrase[];
};

const Phrases: React.FC<PhrasesProps> = ({ items = [] }) => {
	return (
		<>
			<Head>
				<title>Phrases</title>
			</Head>
			<PhrasesList items={items} />
		</>
	);
};

export default Phrases;

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

	return { props: { items } };
}
