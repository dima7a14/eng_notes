import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';

import styles from '../../styles/Phrases.module.css';
import phrases from '../../mocks/phrases';

const Phrases = ({ items = [] }) => {
	return (
		<>
			<Head>
				<title>Phrases</title>
			</Head>
			<Box>
				<Heading as="h2" size="xl" className="page-title">
					Phrases
				</Heading>
				<SimpleGrid p="4" minChildWidth="250px" spacing="50px">
					{items.map((item) => (
						<Box
							key={item.name}
							border="1px"
							borderColor="gray.300"
							shadow="base"
						>
							<Link href={`/phrases/${encodeURI(item.name)}`} passHref>
								<Heading as="h6" size="lg" className={styles.itemTitle}>
									{item.name}
								</Heading>
							</Link>
						</Box>
					))}
				</SimpleGrid>
			</Box>
		</>
	);
};

Phrases.propTypes = {
	item: PropTypes.arrayOf(
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
	return {
		props: {
			items: phrases,
		},
	};
}
