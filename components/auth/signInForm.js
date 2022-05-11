import { useState } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import { Formik, Form, Field } from 'formik';
import {
	Box,
	Text,
	Button,
	FormControl,
	VStack,
	Center,
	Flex,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Heading,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

import server from '../../consts/server';
import { InputField, CheckboxField } from '../fields';
import { UserSchema } from './common';

export default function SignInForm({
	onSubmit,
	onForgotPasswordClick,
	onSignUpClick,
}) {
	const [error, setError] = useState(null);
	const handleSubmit = async (values) => {
		try {
			setError(null);

			const res = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			onSubmit();
		} catch (err) {
			setError(err);
		}
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: false,
			}}
			onSubmit={handleSubmit}
			validationSchema={UserSchema}
		>
			{({ isSubmitting }) => (
				<Form>
					<VStack p={4} spacing="24px">
						<Heading as="h6">Sign In</Heading>
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
						<Field
							component={InputField}
							label="Password"
							name="password"
							leftIcon={<LockIcon color="gray.600" />}
							placeholder="Password"
							type="password"
						/>
						<Flex
							direction="row"
							justify="space-between"
							alignItems="baseline"
							w="100%"
						>
							<Box height="16px" lineHeight="16px">
								<FormControl>
									<Field
										name="rememberMe"
										component={CheckboxField}
										colorScheme="green"
									>
										<Text color="gray.600" fontSize={12}>
											Remember me
										</Text>
									</Field>
								</FormControl>
							</Box>
							<Box height="16px" lineHeight="16px">
								<Button
									variant="link"
									colorScheme="green"
									fontSize={12}
									onClick={onForgotPasswordClick}
								>
									Forgot your password?
								</Button>
							</Box>
						</Flex>
						<Button
							colorScheme="green"
							type="submit"
							w="100%"
							isLoading={isSubmitting}
							loadingText="Submitting"
						>
							Sign in
						</Button>
						<Center>
							<Button
								variant="link"
								colorScheme="green"
								fontSize={12}
								onClick={onSignUpClick}
							>
								Don&apos;t have an account? Sign up
							</Button>
						</Center>
					</VStack>
				</Form>
			)}
		</Formik>
	);
}

SignInForm.propTypes = {
	onForgotPasswordClick: PropTypes.func.isRequired,
	onSignUpClick: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
};

SignInForm.defaultProps = {
	onSubmit: () => null,
};
