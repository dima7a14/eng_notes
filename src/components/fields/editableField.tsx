import React from 'react';
import {
	EditablePreview,
	useColorModeValue,
	IconButton,
	Input,
	Textarea,
	useEditableControls,
	ButtonGroup,
	Editable,
	EditableInput,
	EditableTextarea,
	Tooltip,
	ComponentDefaultProps,
	HStack,
	StackProps,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { FieldProps } from 'formik';

export type EditableFieldProps = ComponentDefaultProps &
	FieldProps & {
		multiline?: boolean;
		onDelete?: () => void;
		containerProps?: StackProps;
	};

export const EditableField: React.FC<EditableFieldProps> = ({
	field,
	multiline = false,
	onDelete,
	containerProps = {},
	...otherProps
}) => {
	const { onChange, value, name } = field;

	return (
		<Editable
			defaultValue={value || 'Click to edit'}
			isPreviewFocusable
			selectAllOnFocus={false}
			onSubmit={(value) => onChange({ target: { value, name } })}
		>
			<HStack alignItems="baseline" {...containerProps}>
				<Tooltip label="Click to edit">
					<EditablePreview
						{...otherProps}
						_hover={{ background: useColorModeValue('gray.100', 'gray.700') }}
					/>
				</Tooltip>
				{multiline ? (
					<Textarea p={2} as={EditableTextarea} />
				) : (
					<Input p={2} as={EditableInput} />
				)}
				<EditableControls />
				{onDelete && (
					<Tooltip label="Remove">
						<IconButton
							icon={<DeleteIcon />}
							aria-label="Remove"
							colorScheme="red"
							onClick={onDelete}
							size="sm"
						/>
					</Tooltip>
				)}
			</HStack>
		</Editable>
	);
};

const EditableControls: React.FC = () => {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
		useEditableControls();

	if (!isEditing) {
		return null;
	}

	return (
		<ButtonGroup justifyContent="start" size="sm" spacing={2} mt={2}>
			<IconButton
				icon={<CheckIcon />}
				{...getSubmitButtonProps()}
				aria-label="Save"
			/>
			<IconButton
				icon={<CloseIcon />}
				{...getCancelButtonProps()}
				aria-label="Cancel"
			/>
		</ButtonGroup>
	);
};
