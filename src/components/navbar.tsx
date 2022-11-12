import React from 'react';
import NextLink from 'next/link';
import { Flex, Heading, Link } from '@chakra-ui/react';

const Navbar: React.FC = () => {
	return (
		<Flex
			p={3}
			bg="green.200"
			direction="row"
			justify="center"
			borderBottom="1px"
			borderBottomColor="gray.300"
			borderRadius="md"
			shadow="base"
			mb={[0, 0, 0, 12]}
			position="sticky"
			top="0"
			left="0"
			zIndex={10}
		>
			<Heading as="h2" textAlign="center" variant="lg" color="gray.700">
				<NextLink href="/">
					<Link>English Notes</Link>
				</NextLink>
			</Heading>
		</Flex>
	);
};

export default Navbar;
