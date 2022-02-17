import PropTypes from 'prop-types';
import {
	Textarea,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react';

export default function TextareaField({
	field,
	form,
	label,
	leftIcon,
	rightIcon,
	helperText,
	formControlProps = {},
	...props
}) {
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
					<InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
				)}
				<Textarea focusBorderColor="green.400" {...field} {...props} />
				{rightIcon && (
					<InputRightElement pointerEvents="none">
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
}

TextareaField.displayName = 'TextareaField';

TextareaField.propTypes = {
	field: PropTypes.object,
	form: PropTypes.object,
	label: PropTypes.string,
	leftIcon: PropTypes.element,
	rightIcon: PropTypes.element,
	helperText: PropTypes.string,
	formCOntrolProps: PropTypes.object,
};
