import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';

import { PhraseForm, PhraseValues } from '@/components/phraseForm';
import { trpc } from '@/utils/trpc';
import { authOptions } from '../api/auth/[...nextauth]';

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

	if (!phrase) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{phrase.name}</title>
			</Head>
			<PhraseForm
				initialValues={{
					name: phrase.name,
					translations: phrase.translations,
					explanations: phrase.explanations,
					examples: phrase.examples,
				}}
				errors={error?.data?.zodError?.fieldErrors}
				isLoading={isLoading}
				isSubmitting={isSaving}
				onSubmit={handleSubmit}
			/>
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
