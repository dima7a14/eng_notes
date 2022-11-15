import React from 'react';
import { useRouter } from 'next/router';
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
	Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { Phrase } from '@prisma/client';
import { trpc } from '../utils/trpc';

const PhraseBlock: React.FC<{ phrase: Phrase }> = ({ phrase }) => (
	<Box
		mt={2}
		p={4}
		backgroundColor="gray.50"
		borderRadius="md"
		transitionProperty="background"
		transitionDuration="200ms"
		_hover={{
			backgroundColor: 'gray.200',
		}}
	>
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

const addPhraseRoute = '/phrases/add';

export const PhrasesLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const { data: phrases, isLoading } = trpc.useQuery(['phrases.phrases']);

	return (
		<HStack spacing={8} maxH="calc(100vh - 7.7rem)" alignItems="flex-start">
			<Box
				bg="white"
				p="2"
				boxShadow="base"
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
					<>
						<PhrasesList phrases={phrases} />
						{router.pathname !== addPhraseRoute && (
							<Center mt={2}>
								<Button
									type="button"
									colorScheme="green"
									size="sm"
									leftIcon={<AddIcon />}
									onClick={() => router.push(addPhraseRoute)}
								>
									Add new Phrase
								</Button>
							</Center>
						)}
					</>
				)}
			</Box>
			<Box flex="1 0 auto" height="100%">
				{children}
			</Box>
		</HStack>
	);
};
