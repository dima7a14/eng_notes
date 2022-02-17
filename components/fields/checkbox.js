import PropTypes from 'prop-types';
import {
	Checkbox,
	FormControl,
	FormHelperText,
	FormErrorMessage,
} from '@chakra-ui/react';

export default function CheckboxField({
	field,
	form,
	helperText,
	children,
	formControlProps = {},
	...props
}) {
	const error = form.touched[field.name] && form.errors[field.name];
	const isError = Boolean(error);

	return (
		<FormControl {...formControlProps} isInvalid={isError}>
			<Checkbox {...field} {...props}>
				{children}
			</Checkbox>
			{!isError && helperText && (
				<FormHelperText color="gray.600">{helperText}</FormHelperText>
			)}
			{isError && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}

CheckboxField.propTypes = {
	field: PropTypes.object,
	form: PropTypes.object,
	helperText: PropTypes.string,
	formControlProps: PropTypes.object,
};
