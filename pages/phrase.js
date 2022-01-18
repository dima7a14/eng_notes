import Head from 'next/head';
import PropTypes from 'prop-types';
import {
	Box,
	Heading,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';

import styles from '../styles/Phrase.module.css';

const InfoItem = ({ title, items }) => {
	return (
		<AccordionItem>
			<h3>
				<AccordionButton
					_expanded={{ bg: 'green.200' }}
					backgroundColor="gray.200"
					borderBottom="1px"
					borderBottomColor="gray.300"
				>
					<Box flex="1" textAlign="left">
						{title}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h3>
			<AccordionPanel pb={4} backgroundColor="gray.100">
				{items.map((item) => (
					<Text key={item} py={3} size="lg">
						{item}
					</Text>
				))}
			</AccordionPanel>
		</AccordionItem>
	);
};

InfoItem.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.string),
};

InfoItem.displayName = 'InfoItem';

const Phrase = () => {
	const data = {
		phrase: 'To usher in',
		translations: ['Ввести, оголошувати'],
		examples: [
			'to user in a new era',
			'the Viennese usher in the New Year with a concert of music by Strauss',
		],
	};

	return (
		<>
			<Head>
				<title>{data.phrase}</title>
			</Head>
			<Box>
				<Heading as="h2" size="4xl" className={styles.phrase}>
					{data.phrase}
				</Heading>
				<Box p={3}>
					<Accordion allowMultiple>
						<InfoItem title="Translations" items={data.translations} />
						<InfoItem title="Examples" items={data.examples} />
					</Accordion>
				</Box>
			</Box>
		</>
	);
};

export default Phrase;
