import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { Button, Input, Form } from 'semantic-ui-react';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',

		width: 300,
		height: 300,
	},
};

interface ISaveAsModalProps {
	isOpen: boolean;
	initialFileName: string;
	onSubmit: (fileName: string) => void;
	onCancel: () => void;
}

export const SaveAsModal: React.FunctionComponent<ISaveAsModalProps> = (props) => {
	const [fileName, setFileName] = useState<string>(props.initialFileName);

	return (
		<Modal isOpen={props.isOpen} style={customStyles}>
			<h3>save as:</h3>
			<Form onSubmit={() => props.onSubmit(fileName)}>
				<Form.Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
				<Button floated="right" onClick={props.onCancel}>
					Cancel
				</Button>

				<Button primary floated="right" type="submit">
					Ok
				</Button>
			</Form>
		</Modal>
	);
};
