import React, { useState } from 'react';
import ReactModal, { Styles } from 'react-modal';
import { Button, List, Image, Header } from 'semantic-ui-react';
import FileIcon from './resources/iconmonstr-party-21-240.png';
import { Timestamp } from '@musicenviro/base';

interface IFileDescription {
    name: string;
    version: string;
    createdStamp: Timestamp;
    lastUpdatedStamp: Timestamp;
}

interface IFileModelProps {
	isOpen: boolean;
	files: IFileDescription[];
	onClose: () => void;
}

const defaultProps: Required<IFileModelProps> = {
	isOpen: false,
	files: [],
	onClose: () => {},
};

export const FileModal: React.FunctionComponent<IFileModelProps> = (props) => {
	const [selectedFile, setSelectedFile] = useState<string>();

	const style: Styles = {
		content: {
			top: '100px',
			width: '800px',
			margin: 'auto',
			bottom: '40px',
			background: 'white',
		},
	};

	return (
		<ReactModal isOpen={props.isOpen} style={style}>
			<Header>Saved Scenes</Header>

			<List celled>
				{props.files.map((file) => {
					return (
                        <List.Item 
                            className={selectedFile === file.name ? 'selected' : ''}
                            onClick={() => setSelectedFile(file.name)}
                            >
							<Image avatar src={FileIcon} />
							<List.Content>
								<List.Header>{file.name}</List.Header>
                                &emsp; 
								created: &nbsp; {new Date(file.createdStamp).toLocaleString()}
                                &emsp; 
                                version: &nbsp; {file.version}
							</List.Content>
						</List.Item>
					);
				})}
			</List>

			<div className="button-footer">
				<Button className="close-button" onClick={props.onClose}>
					Close
				</Button>
			</div>
		</ReactModal>
	);
};
FileModal.defaultProps = defaultProps;
