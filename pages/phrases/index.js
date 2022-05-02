import Head from 'next/head';
import PropTypes from 'prop-types';

import server from '../../consts/server';
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
	const response = await fetch(`${server}/api/phrases`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		const items = await response.json();

		return {
			props: {
				items,
			},
		};
	}

	return { props: { items: [] } };
}
