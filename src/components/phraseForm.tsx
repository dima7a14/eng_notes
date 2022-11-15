import React from 'react';
import {
	Box,
	Center,
	Heading,
	ButtonGroup,
	Button,
	CircularProgress,
	Alert,
	AlertIcon,
	AlertDescription,
	Divider,
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
	errors?: Record<string, string[] | undefined>;
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
	errors = {},
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
						<Box p={4}>
							<Errors errors={errors.name} />
							<PhraseFieldArray
								name="translations"
								label="Translations"
								fieldProps={{ mt: 2 }}
							/>
							<Errors errors={errors.translations} />
							<Divider my={8} />
							<PhraseFieldArray
								name="explanations"
								label="Explanations"
								fieldProps={{ mt: 2 }}
							/>
							<Errors errors={errors.explanations} />
							<Divider my={8} />
							<PhraseFieldArray
								name="examples"
								label="Examples"
								fieldProps={{ mt: 2 }}
							/>
							<Errors errors={errors.examples} />
							{dirty && (
								<>
									<Divider my={8} />
									<ButtonGroup>
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
								</>
							)}
						</Box>
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
			<Box>
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

const Error: React.FC<{ message: string }> = ({ message }) => (
	<Alert status="error" my="10px" borderRadius="md">
		<AlertIcon />
		<AlertDescription fontSize="sm">{message}</AlertDescription>
	</Alert>
);

const Errors: React.FC<{ errors?: string[] }> = ({ errors }) => {
	if (!errors) {
		return null;
	}

	return (
		<>
			{errors.map((errMsg) => (
				<Error key={errMsg} message={errMsg} />
			))}
		</>
	);
};
