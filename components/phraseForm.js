import { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	Flex,
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Center,
	Divider,
	IconButton,
	Heading,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray } from 'formik';

import Phrase from '../models/phrase';
import { Input, Textarea } from './fields';

function PhraseFieldArray({ name, title, itemTitle, multiline }) {
	const InputCmp = multiline ? Textarea : Input;

	return (
		<FieldArray name={name}>
			{({ remove, push, form }) => (
				<>
					<Heading as="h6" size="md" mb="20px">
						{title}
					</Heading>
					{form.values[name].map((value, index) => (
						<FormControl key={value.id} mb="10px">
							<FormLabel htmlFor={`${name}.${index}.value`}>
								{`${itemTitle} ${index + 1}`}
							</FormLabel>
							<Flex>
								<Field
									name={`${name}.${index}.value`}
									component={InputCmp}
									borderTopRightRadius="0"
									borderBottomRightRadius="0"
								/>
								<IconButton
									type="button"
									aria-label={`Remove ${itemTitle}`}
									icon={<CloseIcon />}
									colorScheme="red"
									borderTopLeftRadius="0"
									borderBottomLeftRadius="0"
									onClick={() => remove(index)}
								/>
							</Flex>
						</FormControl>
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
	title,
	buttonTitle,
	name,
	translations,
	explanations,
	examples,
	onSubmit,
	...otherProps
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const isUpdate = Boolean(name);
	const handleSubmit = (values) => {
		console.log('submit values', values);
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
									<FormControl>
										<FormLabel htmlFor="name">Phrase</FormLabel>
										<Field name="name" component={Input} type="text" />
										{/* <FormHelperText>Phrase</FormHelperText> */}
									</FormControl>
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
										{isUpdate ? 'Update' : 'Create'}
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
