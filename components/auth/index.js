import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalCloseButton,
} from '@chakra-ui/react';

import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import ForgotPasswordForm from './forgotPasswordForm';

export const forms = {
	signIn: 'SIGN_IN',
	signUp: 'SIGN_UP',
	forgotPass: 'FORGOT_PASSWORD',
};

export default function Auth({ initialForm, isOpen, onClose }) {
	const [form, setForm] = useState(initialForm);
	let cmp;

	switch (form) {
		case forms.signIn: {
			cmp = (
				<SignInForm
					onForgotPasswordClick={() => setForm(forms.forgotPass)}
					onSignUpClick={() => setForm(forms.signUp)}
					onSubmit={onClose}
				/>
			);
			break;
		}
		case forms.forgotPass: {
			cmp = (
				<ForgotPasswordForm
					onSignInClick={() => setForm(forms.signIn)}
					onSubmit={onClose}
				/>
			);
			break;
		}
		case forms.signUp: {
			cmp = (
				<SignUpForm
					onSignInClick={() => setForm(forms.signIn)}
					onSubmit={onClose}
				/>
			);
			break;
		}
		default:
			return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>{cmp}</ModalBody>
			</ModalContent>
		</Modal>
	);
}

Auth.propTypes = {
	initialForm: PropTypes.oneOf(Object.values(forms)),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

Auth.defaultProps = {
	initialForm: forms.signIn,
};
