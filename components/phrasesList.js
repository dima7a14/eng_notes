import Link from 'next/link';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import styles from '../styles/PhrasesList.module.css';

const PhrasesList = ({ items }) => {
	return (
		<Box>
			<Heading as="h2" size="xl" className="page-title">
				Phrases
			</Heading>
			{items.length > 0 ? (
				<SimpleGrid p="4" minChildWidth="250px" spacing="50px">
					{items.map((item) => (
						<Box
							key={item.name}
							border="1px"
							borderColor="gray.300"
							shadow="base"
							backgroundColor="gray.100"
							_hover={{ backgroundColor: 'gray.50' }}
						>
							<Link href={`/phrases/${encodeURI(item.name)}`} passHref>
								<Heading as="h6" size="lg" className={styles.name}>
									{item.name}
								</Heading>
							</Link>
						</Box>
					))}
				</SimpleGrid>
			) : (
				<Heading as="h6" size="lg">
					No phrases
				</Heading>
			)}
		</Box>
	);
};

PhrasesList.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
		}),
	),
};

export default PhrasesList;
