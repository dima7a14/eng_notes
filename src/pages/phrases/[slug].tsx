import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import {
	Box,
	Center,
	Heading,
	Text,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Badge,
	ButtonGroup,
	Button,
	useToast,
	CircularProgress,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray, FormikHelpers } from 'formik';

import { Phrase } from '@prisma/client';
import { EditableField } from '@/components/fields';
import type { EditableFieldProps } from '@/components/fields/editableField';
import { trpc } from '@/utils/trpc';
import { authOptions } from '../api/auth/[...nextauth]';

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

type PhraseValues = Pick<
	Phrase,
	'name' | 'translations' | 'explanations' | 'examples'
>;

export type PhraseProps = {
	slug: string;
};

const Phrase: React.FC<PhraseProps> = ({ slug }) => {
	const toast = useToast();
	const { data: phrase, isLoading } = trpc.useQuery([
		'phrases.phrase',
		{ slug },
	]);
	const utils = trpc.useContext();
	const {
		mutateAsync,
		error,
		isLoading: isSaving,
	} = trpc.useMutation(['phrases.update-phrase'], {
		onSuccess: () => {
			utils.invalidateQueries(['phrases.phrases']);
			toast({
				title: 'Phrase has been saved',
				status: 'success',
				duration: 3000,
				isClosable: false,
			});
		},
		onError: () => {
			toast({
				title: 'Error while saving new phrase',
				status: 'error',
				duration: 3000,
				isClosable: false,
			});
		},
	});
	const handleSubmit = async (
		values: PhraseValues,
		helpers: FormikHelpers<PhraseValues>,
	) => {
		if (phrase) {
			const translations = values.translations.filter(Boolean) as [
				string,
				...string[]
			];
			const explanations = values.explanations.filter(Boolean) as [
				string,
				...string[]
			];
			const examples = values.examples.filter(Boolean) as [string, ...string[]];

			await mutateAsync({
				...phrase,
				...values,
				translations,
				explanations,
				examples,
			});
			helpers.resetForm({ values });
		}
	};

	if (isLoading) {
		return (
			<Box>
				<Center>
					<CircularProgress isIndeterminate color="green.200" size="120" />
				</Center>
			</Box>
		);
	}

	if (!phrase) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{phrase.name}</title>
			</Head>
			<Formik<PhraseValues>
				initialValues={{
					name: phrase.name,
					translations: phrase.translations,
					explanations: phrase.explanations,
					examples: phrase.examples,
				}}
				onSubmit={handleSubmit}
			>
				{({ dirty, resetForm }) => (
					<Form>
						<Box backgroundColor="white" borderRadius="md" boxShadow="base">
							<Heading
								as="h2"
								size="4xl"
								textAlign="center"
								backgroundColor="gray.200"
								color="gray.700"
								fontWeight="medium"
								padding={8}
								borderTopRadius="md"
							>
								{/* {phrase.name} */}
								<Field
									name="name"
									component={EditableField}
									containerProps={{ justifyContent: 'center' }}
								/>
							</Heading>
							<PhraseFieldArray
								name="translations"
								label="Translations"
								fieldProps={{ mt: 2 }}
							/>
							<PhraseFieldArray
								name="explanations"
								label="Explanations"
								fieldProps={{ mt: 2 }}
							/>
							<PhraseFieldArray
								name="examples"
								label="Examples"
								fieldProps={{ mt: 2 }}
							/>
							{dirty && (
								<ButtonGroup p={3}>
									<Button
										colorScheme="green"
										size="md"
										type="submit"
										isLoading={isSaving}
									>
										Save
									</Button>
									<Button
										colorScheme="red"
										size="md"
										type="button"
										onClick={() => resetForm()}
										disabled={isSaving}
									>
										Reset
									</Button>
								</ButtonGroup>
							)}
						</Box>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Phrase;

const PhraseFieldArray: React.FC<{
	name: string;
	label: string;
	fieldProps?: EditableFieldProps['containerProps'];
}> = ({ name, label, fieldProps = {} }) => (
	<FieldArray name={name}>
		{({ form, push, remove }) => (
			<Box p={4}>
				<Heading as="h6" size="md" mb={2}>
					{label}
				</Heading>
				{form.values[name].map((value: string, index: number) => (
					<Field
						key={value}
						name={`${name}.${index}`}
						component={EditableField}
						onDelete={() => remove(index)}
						fontSize="md"
						color="grey.700"
						fontStyle="italic"
						px={2}
						{...fieldProps}
					/>
				))}
				<Button
					type="button"
					colorScheme="green"
					leftIcon={<AddIcon />}
					onClick={() => push('')}
					mt={2}
					size="sm"
				>
					Add new
				</Button>
			</Box>
		)}
	</FieldArray>
);

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
