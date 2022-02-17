import { useState } from 'react';

import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import ForgotPasswordForm from './forgotPasswordForm';

const forms = {
	signIn: 'SIGN_IN',
	signUp: 'SIGN_UP',
	forgotPass: 'FORGOT_PASSWORD',
};

export default function Auth() {
	const [form, setForm] = useState(forms.signIn);

	switch (form) {
		case forms.signIn:
			return (
				<SignInForm
					onForgotPasswordClick={() => setForm(forms.forgotPass)}
					onSignUpClick={() => setForm(forms.signUp)}
				/>
			);
		case forms.forgotPass:
			return <ForgotPasswordForm onSignInClick={() => setForm(forms.signIn)} />;
		case forms.signUp:
			return <SignUpForm onSignInClick={() => setForm(forms.signIn)} />;
		default:
			return null;
	}
}
