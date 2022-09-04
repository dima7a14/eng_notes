import React from 'react';
import {
	Checkbox,
	FormControl,
	FormHelperText,
	FormErrorMessage,
	FormControlProps,
} from '@chakra-ui/react';
import { FieldProps } from 'formik';

export type CheckBoxFieldProps = FieldProps & {
	helperText?: string;
	formControlProps: FormControlProps;
};

const CheckboxField: React.FC<CheckBoxFieldProps> = ({
	field,
	form,
	helperText,
	children,
	formControlProps = {},
	...props
}) => {
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
};

export default CheckboxField;
