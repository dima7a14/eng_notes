import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { Center, Text } from '@chakra-ui/react';

import { authOptions } from './api/auth/[...nextauth]';

const Home: React.FC = () => {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>My English notes</title>
			</Head>
			{session && (
				<Center h="100%">
					<Text fontSize="3xl" fontWeight="bold" color="gray.600">
						Pick a Phrase
					</Text>
				</Center>
			)}
		</>
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
