import Head from 'next/head';
import PropTypes from 'prop-types';

import { getPhrases } from '../../db';
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
	const { data: phrases, error } = await getPhrases();

	if (error) {
		console.error(error);

		return {
			props: {
				items: [],
			},
		};
	}

	return {
		props: {
			items: phrases,
		},
	};
}
