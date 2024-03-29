import React from 'react';
import {
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	FormControlProps,
	InputElementProps,
} from '@chakra-ui/react';
import { FieldProps } from 'formik';

export type InputFieldProps = FieldProps & {
	label?: string;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;
	helperText?: string;
	formControlProps?: FormControlProps;
	inputLeftElementProps?: InputElementProps;
	inputRightElementProps?: InputElementProps;
};

const InputField: React.FC<InputFieldProps> = ({
	field,
	form,
	label,
	leftIcon,
	rightIcon,
	helperText,
	formControlProps = {},
	inputLeftElementProps = {},
	inputRightElementProps = {},
	...props
}) => {
	const error =
		form.touched[field.name] && form.submitCount > 0
			? form.errors[field.name]
			: null;
	const isError = Boolean(error);

	return (
		<FormControl {...formControlProps} isInvalid={isError}>
			{label && (
				<FormLabel htmlFor={field.name} color="gray.600">
					{label}
				</FormLabel>
			)}
			<InputGroup>
				{leftIcon && (
					<InputLeftElement {...inputLeftElementProps}>
						{leftIcon}
					</InputLeftElement>
				)}
				<Input focusBorderColor="green.400" {...field} {...props} />
				{rightIcon && (
					<InputRightElement {...inputRightElementProps}>
						{rightIcon}
					</InputRightElement>
				)}
			</InputGroup>
			{!isError && helperText && (
				<FormHelperText color="gray.600">{helperText}</FormHelperText>
			)}
			{isError && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};

export default InputField;
