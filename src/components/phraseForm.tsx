import React, { useState, useRef } from 'react';
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
	AlertTitle,
	AlertDescription,
	CloseButton,
	useToast,
	ButtonProps,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray } from 'formik';

import { Phrase } from '@/models/phrase';
import { InputField, TextareaField } from './fields';

type PhraseFieldArrayProps = {
	name: string;
	title: string;
	itemTitle: string;
	multiline?: boolean;
};

type PhraseFieldArrayValue = {
	id: string;
	value: string;
};

function parseFieldArrayValue(value: string): PhraseFieldArrayValue {
	return { value, id: uuidv4() };
}

const PhraseFieldArray: React.FC<PhraseFieldArrayProps> = ({ name, title, itemTitle, multiline = false }) => {
	const InputCmp = multiline ? TextareaField : InputField;

	return (
		<FieldArray name={name}>
			{({ remove, push, form }) => (
				<>
					<Heading as="h6" size="md" mb="20px">
						{title}
					</Heading>
					{form.values[name].map((value: PhraseFieldArrayValue, index: number) => (
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
					))}
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
}

type PhraseFormProps = Partial<Omit<Phrase, 'userId'>> & Omit<ButtonProps, 'onSubmit'> & {
	title: string;
	buttonTitle: string;
	onSubmit: (data: Phrase) => void;
};

type PhraseFormValues = {
	name: string;
	translations: PhraseFieldArrayValue[];
	examples: PhraseFieldArrayValue[];
	explanations: PhraseFieldArrayValue[];
};

const PhraseForm: React.FC<PhraseFormProps> = ({
	id,
	title,
	buttonTitle,
	name = '',
	translations = [],
	explanations = [],
	examples = [],
	onSubmit,
	...otherProps
}) => {
	const [error, setError] = useState<Error | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const toast = useToast();
	const handleSubmit = async (values: PhraseFormValues) => {
		setError(null);

		const phrase: Phrase = {
			...values,
			translations: values.translations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
			examples: values.examples
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
			explanations: values.explanations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
		};

		try {
			onSubmit(phrase);
			toast({
				title: id ? 'Phrase updated' : 'Phrase created',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			onClose();
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
		}
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
					{buttonTitle}
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
								<DrawerHeader>{title}</DrawerHeader>
								<DrawerBody>
									{error && (
										<Alert status="error">
											<AlertIcon />
											{/* <AlertTitle mr={2}>{error.status}</AlertTitle> */}
											<AlertDescription fontSize="sm">
												{error.message}
											</AlertDescription>
											<CloseButton
												position="absolute"
												right="8px"
												top="8px"
												onClick={() => setError(null)}
											/>
										</Alert>
									)}
									<Field
										component={InputField}
										label="Phrase"
										name="name"
										placeholder="Phrase"
									/>
									<Divider my="20px" />
									<PhraseFieldArray
										name="translations"
										title="Translations"
										itemTitle="Translation"
									/>
									<PhraseFieldArray
										name="explanations"
										title="Explanations"
										itemTitle="Explanation"
										multiline
									/>
									<PhraseFieldArray
										name="examples"
										title="Examples"
										itemTitle="Example"
										multiline
									/>
								</DrawerBody>
								<DrawerFooter>
									<Button variant="outline" mr={4} onClick={onClose}>
										Cancel
									</Button>
									<Button colorScheme="green" type="submit">
										{id ? 'Update' : 'Create'}
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


export default PhraseForm;
