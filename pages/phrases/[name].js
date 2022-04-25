import Head from 'next/head';
import { useRouter } from 'next/router';
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
	Badge,
} from '@chakra-ui/react';

import styles from '../../styles/Phrase.module.css';
import phrases from '../../mocks/phrases';

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
						<Badge colorScheme="green" ml="1">
							{items.length}
						</Badge>
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
	const router = useRouter();
	const { name } = router.query;
	const phrase = phrases.find((p) => p.name === name);

	if (!phrase) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{phrase.name}</title>
			</Head>
			<Box>
				<Heading as="h2" size="4xl" className={styles.phrase}>
					{phrase.name}
				</Heading>
				<Box p={3}>
					<Accordion allowMultiple>
						<InfoItem title="Translations" items={phrase.translations} />
						<InfoItem title="Explanations" items={phrase.explanations} />
						<InfoItem title="Examples" items={phrase.examples} />
					</Accordion>
				</Box>
			</Box>
		</>
	);
};

export default Phrase;

export async function getServerSideProps(context) {
	return {
		props: {},
	};
}
