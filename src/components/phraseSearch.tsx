import React, { useState, ChangeEvent, useEffect } from 'react';
import {
	Center,
	InputGroup,
	InputLeftElement,
	Input,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	useDisclosure,
	Stack,
	Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDebounce } from 'react-use';

import { trpc } from '@/utils/trpc';

export type PhraseSearchProps = {
	width: number;
};

const PhraseSearch: React.FC<PhraseSearchProps> = ({ width }) => {
	const [value, setValue] = useState<string>('');
	const [debouncedValue, setDebouncedValue] = useState<string>('');

	useDebounce(
		() => {
			setDebouncedValue(value);
		},
		1000,
		[value],
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value.trim());
	};
	const { data: searchedPhrases } = trpc.useQuery(
		['phrases.search-phrases', { search: debouncedValue }],
		{
			enabled: debouncedValue.length > 3,
			onSettled(phrases, error) {
				console.log('onSettled', phrases, error);
				if (error || !phrases?.length) {
					onClose();
					return;
				}

				onOpen();
			},
		},
	);

	return (
		<Center justifyContent="center">
			<Popover isOpen={isOpen} placement="bottom" closeOnBlur={true}>
				<PopoverTrigger>
					<InputGroup width={width}>
						<InputLeftElement pointerEvents="none" h="48px">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input
							type="text"
							size="lg"
							variant="filled"
							placeholder="Search phrase..."
							onChange={handleInputChange}
							value={value}
						/>
					</InputGroup>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverHeader
						fontWeight="bold"
						color="gray.700"
						p={2}
						bg="gray.100"
						textAlign="center"
					>
						Results
					</PopoverHeader>
					<PopoverBody p={0}>
						<Stack>
							{searchedPhrases?.map((phrase) => (
								<Box
									key={phrase.id}
									as="button"
									w="100%"
									textAlign="left"
									lineHeight="40px"
									_hover={{ bg: '#ebedf0' }}
									_focus={{ boxShadow: '0 1px 1px rgba(0, 0, 0, .15)' }}
									_active={{ bg: '#dddfe2' }}
									px={4}
									borderRadius={4}
								>
									{phrase.name}
								</Box>
							))}
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Center>
	);
};

export default PhraseSearch;
