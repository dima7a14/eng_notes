import * as yup from 'yup';

export const UserSchema = yup.object().shape({
	email: yup.string().email('Invalid email.').required('Email is required.'),
	password: yup.string().required('Email is required.'),
	rememberMe: yup.boolean(),
});

export const ForgotPasswordSchema = yup.object().shape({
	email: yup.string().email('Email is required.'),
});
