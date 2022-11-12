import React from 'react';
import Link from 'next/link';
import {
	Flex,
	Text,
	HStack,
	Box,
	Center,
	Heading,
	Divider,
	CircularProgress,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Phrase } from '@prisma/client';
import { trpc } from '../utils/trpc';

const PhraseBlock: React.FC<{ phrase: Phrase }> = ({ phrase }) => (
	<Box mt={2} p={4} backgroundColor="gray.50" borderRadius="md">
		<Box mb={2}>
			<Heading as="h4" size="md" color="gray.700">
				<Link href={`/phrases/${phrase.slug}`}>{phrase.name}</Link>
			</Heading>
			<Text fontSize="xs">{dayjs(phrase.insertedAt).format('YYYY-MM-DD')}</Text>
		</Box>
		<Divider />
		{phrase.translations.slice(0, 2).map((translation, index) => (
			<Text
				key={index}
				mt={2}
				fontSize="sm"
				fontStyle="italic"
				lineHeight="5"
				textAlign="left"
			>
				{translation}
			</Text>
		))}
	</Box>
);

const PhrasesList: React.FC<{ phrases?: Phrase[] }> = ({ phrases }) => {
	if (!Array.isArray(phrases)) {
		return (
			<Center>
				<Heading size="lg" color="gray.700">
					No phrases
				</Heading>
			</Center>
		);
	}

	return (
		<>
			<Center mb={8}>
				<Heading size="lg" color="gray.700">
					Phrases
				</Heading>
			</Center>
			{phrases.map((phrase) => (
				<PhraseBlock key={phrase.id} phrase={phrase} />
			))}
		</>
	);
};

export const PhrasesLayout: React.FC = ({ children }) => {
	const { data: phrases, isLoading } = trpc.useQuery(['phrases.phrases']);

	return (
		<HStack spacing={8} maxH="calc(100vh - 7.7rem)" alignItems="flex-start">
			<Box
				bg="white"
				p="2"
				boxShadow="lg"
				width={300}
				height="100%"
				borderRadius="md"
			>
				{isLoading ? (
					<Flex
						direction="column"
						justifyContent="center"
						alignItems="center"
						h="100%"
					>
						<CircularProgress isIndeterminate color="green.200" size={90} />
					</Flex>
				) : (
					<PhrasesList phrases={phrases} />
				)}
			</Box>
			<Box flex="1 0 auto" height="100%">
				{children}
			</Box>
		</HStack>
	);
};