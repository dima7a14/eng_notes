import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import {
	Box,
	Heading,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Badge,
} from '@chakra-ui/react';

import type { Phrase } from '@/models/phrase';
import { trpc } from '@/utils/trpc';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from '@/styles/Phrase.module.css';

type InfoItemProps = {
	title: string;
	items: string[];
};

const InfoItem: React.FC<InfoItemProps> = ({ title, items }) => {
	return (
		<AccordionItem>
			<h3>
				<AccordionButton
					_expanded={{ bg: 'green.200' }}
					backgroundColor="gray.200"
					borderBottom="1px"
					borderBottomColor="gray.300"
				>
					<Box flex="1" textAlign="left">
						{title}
						<Badge colorScheme="green" ml="1">
							{items.length}
						</Badge>
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h3>
			<AccordionPanel pb={4} backgroundColor="gray.100">
				{items.map((item) => (
					<Text key={item} py={3} fontSize="lg">
						{item}
					</Text>
				))}
			</AccordionPanel>
		</AccordionItem>
	);
};

InfoItem.displayName = 'InfoItem';

export type PhraseProps = {
	slug: string;
};

const Phrase: React.FC<PhraseProps> = ({ slug }) => {
	const { data: phrase } = trpc.useQuery(['phrases.phrase', { slug }]);

	if (!phrase) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{phrase.name}</title>
			</Head>
			<Box>
				<Heading as="h2" size="4xl" className={styles.phrase}>
					{phrase.name}
				</Heading>
				<Box p={3}>
					<Accordion allowMultiple>
						<InfoItem title="Translations" items={phrase.translations} />
						<InfoItem title="Explanations" items={phrase.explanations} />
						<InfoItem title="Examples" items={phrase.examples} />
					</Accordion>
				</Box>
			</Box>
		</>
	);
};

export default Phrase;

export async function getServerSideProps({
	req,
	res,
	query,
}: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
			},
		};
	}

	const { slug } = query;

	if (!slug) {
		return {
			redirect: {
				destination: '/phrases',
			},
		};
	}

	return {
		props: { slug },
	};
}
