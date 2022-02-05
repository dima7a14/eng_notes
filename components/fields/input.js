import { Input as ChakraInput } from '@chakra-ui/react';

export default function Input({ field, form, ...props }) {
	return <ChakraInput {...field} {...props} />;
}

Input.displayName = 'Input';
