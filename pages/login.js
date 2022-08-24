import React from 'react';
import { signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import {
	Button,
	Center,
	VStack,
	Heading,
	Container,
	Flex,
} from '@chakra-ui/react';

import { authOptions } from './api/auth/[...nextauth]';

export default function Login() {
	return (
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
			{/* <Container flex="1"> */}
			{/* <VStack p={4} spacing={24}> */}
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
			{/* </VStack> */}
			{/* </Container> */}
		</>
	);
}

export async function getServerSideProps(context) {
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
