import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';

import { PhraseForm, PhraseValues } from '@/components/phraseForm';
import { trpc } from '@/utils/trpc';
import { authOptions } from '../api/auth/[...nextauth]';

const AddPhrase: React.FC = () => {
	const toast = useToast();
	const router = useRouter();
	const utils = trpc.useContext();
	const { mutateAsync, error, isLoading } = trpc.useMutation(
		['phrases.create-phrase'],
		{
			onSuccess: (input) => {
				utils.invalidateQueries(['phrases.phrases']);
				toast({
					title: 'Phrase has been saved',
					status: 'success',
					duration: 3000,
					isClosable: false,
				});

				router.push(`/phrases/${input.slug}`);
			},
			onError: () => {
				toast({
					title: 'Error while saving new phrase',
					status: 'error',
					duration: 3000,
					isClosable: false,
				});
			},
		},
	);
	const handleSubmit = async (
		values: PhraseValues,
		helpers: FormikHelpers<PhraseValues>,
	) => {
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
			...values,
			translations,
			explanations,
			examples,
		});
		helpers.resetForm({ values });
	};

	return (
		<>
			<Head>
				<title>Add new Phrase</title>
			</Head>
			<PhraseForm
				isLoading={false}
				isSubmitting={isLoading}
				onSubmit={handleSubmit}
				errors={error?.data?.zodError?.fieldErrors}
			/>
		</>
	);
};

export default AddPhrase;

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
			},
		};
	}

	return {
		props: {},
	};
}
