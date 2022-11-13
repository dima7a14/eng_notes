import React from 'react';
import {
	Box,
	Center,
	Heading,
	ButtonGroup,
	Button,
	CircularProgress,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray, FormikHelpers } from 'formik';

import { Phrase } from '@prisma/client';
import { EditableField } from '@/components/fields';
import type { EditableFieldProps } from '@/components/fields/editableField';

export type PhraseValues = Pick<
	Phrase,
	'name' | 'translations' | 'explanations' | 'examples'
>;

export type PhraseFormProps = {
	isLoading: boolean;
	isSubmitting: boolean;
	initialValues?: PhraseValues;
	onSubmit: (
		values: PhraseValues,
		helpers: FormikHelpers<PhraseValues>,
	) => void;
};

const defaultInitialValues: PhraseValues = {
	name: '',
	translations: [],
	explanations: [],
	examples: [],
};

export const PhraseForm: React.FC<PhraseFormProps> = ({
	initialValues = defaultInitialValues,
	isLoading,
	isSubmitting,
	onSubmit,
}) => {
	if (isLoading) {
		return (
			<Box>
				<Center>
					<CircularProgress isIndeterminate color="green.200" size="120" />
				</Center>
			</Box>
		);
	}

	return (
		<Formik<PhraseValues> initialValues={initialValues} onSubmit={onSubmit}>
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
									isLoading={isSubmitting}
								>
									Save
								</Button>
								<Button
									colorScheme="red"
									size="md"
									type="button"
									onClick={() => resetForm()}
									disabled={isSubmitting}
								>
									Reset
								</Button>
							</ButtonGroup>
						)}
					</Box>
				</Form>
			)}
		</Formik>
	);
};

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
