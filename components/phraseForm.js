import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
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
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray } from 'formik';

import { createPhrase, updatePhrase, useSupabase } from '../db';
import Phrase from '../models/phrase';
import { InputField, TextareaField } from './fields';

function PhraseFieldArray({ name, title, itemTitle, multiline }) {
	const InputCmp = multiline ? TextareaField : InputField;

	return (
		<FieldArray name={name}>
			{({ remove, push, form }) => (
				<>
					<Heading as="h6" size="md" mb="20px">
						{title}
					</Heading>
					{form.values[name].map((value, index) => (
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

PhraseFieldArray.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	itemTitle: PropTypes.string.isRequired,
	multiline: PropTypes.bool,
};

PhraseFieldArray.defaultProps = {
	multiline: false,
};

function PhraseForm({
	id,
	title,
	buttonTitle,
	name,
	translations,
	explanations,
	examples,
	onSubmit,
	...otherProps
}) {
	const [error, setError] = useState(null);
	const supabase = useSupabase();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const toast = useToast();
	const handleSubmit = async (values) => {
		setError(null);

		const phrase = new Phrase({
			...values,
			userId: supabase.auth.user().id,
			translations: values.translations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
			examples: values.examples
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
			explanations: values.explanations
				.map(({ value }) => value)
				.filter((value) => Boolean(value)),
		});
		const { data, error } = id
			? await updatePhrase(id, phrase.data)
			: await createPhrase(phrase.data);

		if (error) {
			setError(error);
		} else {
			onSubmit(data);
			toast({
				title: id ? 'Phrase updated' : 'Phrase created',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			onClose();
		}
	};

	if (!supabase.auth.user()) {
		return null;
	}

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
						translations,
						explanations,
						examples,
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
											<AlertTitle mr={2}>{error.status}</AlertTitle>
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
}

PhraseForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string.isRequired,
	buttonTitle: PropTypes.string.isRequired,
	name: PropTypes.string,
	translations: PropTypes.arrayOf(PropTypes.string),
	explanations: PropTypes.arrayOf(PropTypes.string),
	examples: PropTypes.arrayOf(PropTypes.string),
	onSubmit: PropTypes.func.isRequired,
};

PhraseForm.defaultProps = {
	name: '',
	translations: [],
	explanations: [],
	examples: [],
};

export default PhraseForm;
