import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Center,
	Divider,
	IconButton,
	Heading,
	Alert,
	AlertIcon,
	AlertDescription,
	useToast,
	ButtonProps,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray } from 'formik';

import { trpc } from '@/utils/trpc';
import { Phrase } from '@/models/phrase';
import { InputField, TextareaField } from './fields';

const Error: React.FC<{ message: string }> = ({ message }) => (
	<Alert status="error" my="10px" borderRadius="md">
		<AlertIcon />
		<AlertDescription fontSize="sm">{message}</AlertDescription>
	</Alert>
);

type ErrorsProps = {
	errors?: string[];
};

const Errors: React.FC<ErrorsProps> = ({ errors }) => {
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

type PhraseFieldArrayProps = {
	name: string;
	title: string;
	itemTitle: string;
	multiline?: boolean;
	errors?: string[];
};

type PhraseFieldArrayValue = {
	id: string;
	value: string;
};

function parseFieldArrayValue(value: string): PhraseFieldArrayValue {
	return { value, id: uuidv4() };
}

const PhraseFieldArray: React.FC<PhraseFieldArrayProps> = ({
	name,
	title,
	itemTitle,
	multiline = false,
	errors,
}) => {
	const InputCmp = multiline ? TextareaField : InputField;

	return (
		<FieldArray name={name}>
			{({ remove, push, form }) => (
				<>
					<Heading as="h6" size="md" mb="20px">
						{title}
					</Heading>
					{form.values[name].map(
						(value: PhraseFieldArrayValue, index: number) => (
							<>
								<Field
									key={value.id}
									component={InputCmp}
									name={`${name}.${index}.value`}
									rightIcon={
										<IconButton
											type="button"
											aria-label={`Remove ${itemTitle}`}
											icon={<CloseIcon />}
											colorScheme="red"
											onClick={() => remove(index)}
											size="xs"
										/>
									}
									formControlProps={{ mb: '10px' }}
								/>
								{errors?.[index] && <Error message={errors[index]} />}
							</>
						),
					)}
					<Box>
						<Button
							type="button"
							colorScheme="green"
							leftIcon={<AddIcon />}
							onClick={() => push({ id: uuidv4(), value: '' })}
						>
							Add {itemTitle}
						</Button>
					</Box>
					<Divider my="20px" />
				</>
			)}
		</FieldArray>
	);
};

type AddPhraseProps = Partial<Omit<Phrase, 'userId'>> &
	Omit<ButtonProps, 'onSubmit'>;

type PhraseFormValues = {
	name: string;
	translations: PhraseFieldArrayValue[];
	examples: PhraseFieldArrayValue[];
	explanations: PhraseFieldArrayValue[];
};

const AddPhrase: React.FC<AddPhraseProps> = ({
	name = '',
	translations = [],
	explanations = [],
	examples = [],
	...otherProps
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const toast = useToast();
	const utils = trpc.useContext();
	const { mutate, error, isLoading } = trpc.useMutation(
		['phrases.create-phrase'],
		{
			onSuccess: (input) => {
				utils.invalidateQueries(['phrases.phrases']);
				utils.invalidateQueries(['phrases.phrase', { slug: input.slug }]);
				utils.invalidateQueries(['phrases.phrase', { id: input.id }]);
				onClose();
				toast({
					title: 'New phrase has been added',
					status: 'success',
					duration: 3000,
					isClosable: false,
				});
			},
			onError: () => {
				toast({
					title: 'Error while adding new phrase',
					status: 'error',
					duration: 3000,
					isClosable: false,
				});
			},
		},
	);
	const parsedErrors = {
		...error?.data?.zodError?.fieldErrors,
	};
	const handleSubmit = (values: PhraseFormValues) => {
		const phrase = {
			...values,
			translations: values.translations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)) as [string, ...string[]],
			examples: values.examples
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
			explanations: values.explanations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
		};

		mutate(phrase);
	};

	return (
		<>
			<Center>
				<Button
					ref={btnRef}
					colorScheme="green"
					variant="outline"
					leftIcon={<AddIcon />}
					onClick={onOpen}
					{...otherProps}
				>
					Add new phrase
				</Button>
			</Center>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<Formik
					initialValues={{
						name,
						translations: translations.map(parseFieldArrayValue),
						explanations: explanations.map(parseFieldArrayValue),
						examples: examples.map(parseFieldArrayValue),
					}}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader>Add new phrase</DrawerHeader>
								<DrawerBody>
									<Field
										component={InputField}
										label="Phrase"
										name="name"
										placeholder="Phrase"
									/>
									<Errors errors={parsedErrors?.name} />
									<Divider my="20px" />
									<PhraseFieldArray
										name="translations"
										title="Translations"
										itemTitle="Translation"
										errors={parsedErrors?.translations}
									/>
									<PhraseFieldArray
										name="explanations"
										title="Explanations"
										itemTitle="Explanation"
										multiline
										errors={parsedErrors?.explanations}
									/>
									<PhraseFieldArray
										name="examples"
										title="Examples"
										itemTitle="Example"
										multiline
										errors={parsedErrors?.examples}
									/>
								</DrawerBody>
								<DrawerFooter>
									<Button variant="outline" mr={4} onClick={onClose}>
										Cancel
									</Button>
									<Button
										colorScheme="green"
										type="submit"
										isLoading={isLoading}
									>
										Save
									</Button>
								</DrawerFooter>
							</DrawerContent>
						</Form>
					)}
				</Formik>
			</Drawer>
		</>
	);
};

export default AddPhrase;
