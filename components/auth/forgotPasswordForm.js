import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import {
	Button,
	VStack,
	Center,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Heading,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

import { InputField } from '../fields';
import { ForgotPasswordSchema } from './common';

export default function ForgotPasswordForm({ onSignInClick }) {
	const [error, setError] = useState(null);
	const handleSubmit = async ({ email }) => {
		// TODO: add request sending
		setError(null);
	};

	return (
		<Formik
			initialValues={{
				email: '',
			}}
			onSubmit={handleSubmit}
			validationSchema={ForgotPasswordSchema}
		>
			{({ isSubmitting }) => (
				<Form>
					<VStack p={4} spacing="24px">
						<Heading as="h6">Forgot Password</Heading>
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
							label="Email address"
							name="email"
							leftIcon={<EmailIcon color="gray.600" />}
							placeholder="Email"
						/>
						<Button
							colorScheme="green"
							type="submit"
							w="100%"
							isLoading={isSubmitting}
							loadingText="Submitting"
						>
							Send reset password instructions
						</Button>
						<Center>
							<Button
								variant="link"
								colorScheme="green"
								fontSize={12}
								onClick={onSignInClick}
							>
								Have already account? Sign in
							</Button>
						</Center>
					</VStack>
				</Form>
			)}
		</Formik>
	);
}

ForgotPasswordForm.propTypes = {
	onSignInClick: PropTypes.func.isRequired,
};
