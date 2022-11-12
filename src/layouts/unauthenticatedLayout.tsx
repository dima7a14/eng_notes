import React from 'react';
import { Container, Flex } from '@chakra-ui/react';

export const UnauthenticatedLayout: React.FC = ({ children }) => (
	<Container
		flex="1"
		maxW="container.xl"
		p={0}
		backgroundColor="white"
		border="1px"
		borderColor="gray.300"
		shadow="base"
		display="flex"
		flexDir="column"
		justifyContent="center"
		flexWrap="nowrap"
	>
		<Flex direction="column" flex="1">
			{children}
		</Flex>
	</Container>
);
