import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from '../api/auth/[...nextauth]';

const Phrases: React.FC = () => {
	return (
		<>
			<Head>
				<title>Phrases</title>
			</Head>
			<div>Under development</div>
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

	return { props: {} };
}
