import React from 'react';
import NextLink from 'next/link';
import {
	Box,
	Heading,
	SimpleGrid,
	Center,
	Link,
	Spinner,
	Stack,
} from '@chakra-ui/react';

import styles from '@/styles/PhrasesList.module.css';
import { trpc } from '@/utils/trpc';
import AddPhrase from './addPhrase';
import PhraseSearch from './phraseSearch';

const PhrasesList: React.FC = () => {
	const { data, isLoading } = trpc.useQuery(['phrases.phrases']);

	return (
		<Box w="full">
			<Stack spacing={4}>
				<Heading as="h2" size="xl" className="page-title">
					<NextLink href="/phrases/">
						<Link>Phrases</Link>
					</NextLink>
				</Heading>
				<PhraseSearch width={360} />
				{isLoading && (
					<Center>
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="green.600"
							size="xl"
						/>
					</Center>
				)}
				{data && data.length > 0 ? (
					<SimpleGrid p="4" minChildWidth="250px" spacing="50px">
						{data.map((item) => (
							<Box
								key={item.name}
								border="1px"
								borderColor="gray.300"
								shadow="base"
								backgroundColor="gray.100"
								_hover={{ backgroundColor: 'gray.50' }}
							>
								<Heading as="h6" size="lg">
									<NextLink
										href={`/phrases/${encodeURI(item.slug ?? '')}`}
										passHref
									>
										<Link className={styles.name}>{item.name}</Link>
									</NextLink>
								</Heading>
							</Box>
						))}
					</SimpleGrid>
				) : (
					<Center bg="gray.300" h="100px" w="full" fontSize="xl">
						No phrases
					</Center>
				)}
				<AddPhrase mt={100} />
			</Stack>
		</Box>
	);
};
export default PhrasesList;
