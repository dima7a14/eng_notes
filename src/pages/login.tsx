import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import {
	Button,
	Center,
} from '@chakra-ui/react';

import { authOptions } from './api/auth/[...nextauth]';

const Login: React.FC = () => (
		<>
			<Center
				bg="gray.100"
				h="100px"
				color="gray.800"
				fontSize="4xl"
				fontWeight={700}
				borderTopRadius="md"
				shadow="base"
			>
				Sign In
			</Center>
			<Center flex="1">
				<Button
					colorScheme="red"
					variant="outline"
					type="button"
					onClick={() => signIn('google')}
				>
					Sign in with Google
				</Button>
			</Center>
		</>
	);

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions,
	);

	if (session) {
		return {
			redirect: {
				destination: '/',
			},
		};
	}

	return {
		props: {},
	};
}
