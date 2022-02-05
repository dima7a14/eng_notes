import { Textarea as ChakraTextarea } from '@chakra-ui/react';

export default function Textarea({ field, form, ...props }) {
	return <ChakraTextarea {...field} {...props} />;
}

Textarea.displayName = 'Textarea';
