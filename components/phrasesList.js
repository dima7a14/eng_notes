import NextLink from 'next/link';
import { Box, Heading, SimpleGrid, Center, Link } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import styles from '../styles/PhrasesList.module.css';

const PhrasesList = ({ items }) => {
	return (
		<Box w="full">
			<Heading as="h2" size="xl" className="page-title">
				<NextLink href="/phrases/">
					<Link>Phrases</Link>
				</NextLink>
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
							<Heading as="h6" size="lg">
								<NextLink href={`/phrases/${encodeURI(item.name)}`} passHref>
									<Link className={styles.name}>{item.name}</Link>
								</NextLink>
							</Heading>
						</Box>
					))}
				</SimpleGrid>
			) : (
				<Center bg="gray.300" h="100px" w="full" fontSize="xl">
					No phrases
				</Center>
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
