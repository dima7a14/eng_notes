import React from 'react';
import {
	Textarea,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	FormControlProps,
} from '@chakra-ui/react';
import { FieldProps } from 'formik';

export type TextareaFieldProps = FieldProps & {
	label?: string;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;
	helperText?: string;
	formControlProps: FormControlProps;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
	field,
	form,
	label,
	leftIcon,
	rightIcon,
	helperText,
	formControlProps,
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
				{leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
				<Textarea focusBorderColor="green.400" {...field} {...props} />
				{rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
			</InputGroup>
			{!isError && helperText && (
				<FormHelperText color="gray.600">{helperText}</FormHelperText>
			)}
			{isError && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}

TextareaField.displayName = 'TextareaField';

export default TextareaField;
