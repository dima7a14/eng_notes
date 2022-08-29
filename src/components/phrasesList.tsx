import React from 'react';
import NextLink from 'next/link';
import { Box, Heading, SimpleGrid, Center, Link } from '@chakra-ui/react';

import server from '@/consts/server';
import styles from '@/styles/PhrasesList.module.css';
import type { Phrase } from '@/models/phrase';
import PhraseForm from './phraseForm';

export type PhrasesListProps = {
	items: Phrase[];
};

const PhrasesList: React.FC<PhrasesListProps> = ({ items }) => {
	const createPhrase = (data: Phrase) => {
		fetch(`${server}/api/phrases`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	};

	return (
		<Box w="full">
			<Heading as="h2" size="xl" className="page-title">
				<NextLink href="/phrases/">
					<Link>Phrases</Link>
				</NextLink>
			</Heading>
			{items.length > 0 ? (
				<SimpleGrid p="4" minChildWidth="250px" spacing="50px">
					{items.map((item) => (
						<Box
							key={item.name}
							border="1px"
							borderColor="gray.300"
							shadow="base"
							backgroundColor="gray.100"
							_hover={{ backgroundColor: 'gray.50' }}
						>
							<Heading as="h6" size="lg">
								<NextLink href={`/phrases/${encodeURI(item.slug ?? '')}`} passHref>
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
			<PhraseForm
				title="Add phrase"
				buttonTitle="Add new phrase"
				mt="100px"
				onSubmit={createPhrase}
			/>
		</Box>
	);
};
export default PhrasesList;
