import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import PropTypes from 'prop-types';

import server from '../../consts/server';
import { authOptions } from '../api/auth/[...nextauth]';
import PhrasesList from '../../components/phrasesList';

const Phrases = ({ items = [] }) => {
	return (
		<>
			<Head>
				<title>Phrases</title>
			</Head>
			<PhrasesList items={items} />
		</>
	);
};

Phrases.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			translations: PropTypes.arrayOf(PropTypes.string),
			explanations: PropTypes.arrayOf(PropTypes.string),
			examples: PropTypes.arrayOf(PropTypes.string),
		}),
	),
};

export default Phrases;

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions,
	);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
			},
		};
	}

	let items = [];
	const response = await fetch(`${server}/api/phrases`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		items = await response.json();
	}

	return { props: { items } };
}
