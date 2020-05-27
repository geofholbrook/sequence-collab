import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { Button, List, Image, Header } from 'semantic-ui-react';
import FileIcon from './resources/iconmonstr-party-21-240.png';
import { IFileDescription } from '../../@types';
import { requestFileListForUser } from '../../client/rest/requests';

import relativeDate from 'relative-date';

Modal.setAppElement('#root');

interface IFileModalProps {
	isOpen: boolean;
	username: string;
	onClose: () => void;
	onOpenFile: (filename: string) => void
}

const defaultProps: Required<IFileModalProps> = {
	isOpen: false,
	username: '',
	onClose: () => {},
	onOpenFile: (filename: string) => {}
};

export const FileModal: React.FunctionComponent<IFileModalProps> = (props) => {
	const [selectedFile, setSelectedFile] = useState<string>();
	const [fileList, setFileList] = useState<IFileDescription[]>([]);
	const [serverError, setServerError] = useState<string>();

	const style: Styles = {
		content: {
			top: '100px',
			width: '800px',
			margin: 'auto',
			bottom: '40px',
			background: 'white',
		},
	};

	async function handleAfterOpen() {
		const res = await requestFileListForUser(props.username);

		if (res.success) {
			setFileList(res.fileList!);
		} else {
			setServerError(res.message);
		}
	}

	function handleOpenButton() {
		alert('not implemented');
	}
	function handleTrashButton() {
		alert('not implemented');
	}
	function handleNewFileButton() {
		alert('not implemented');
	}

	return (
		<Modal isOpen={props.isOpen} style={style} onAfterOpen={handleAfterOpen}>
			<div className="button-header">
				
				<Button.Group basic className="file-modal-buttons">
					<Button icon="trash" onClick={handleTrashButton} />
					<Button icon="folder open outline" onClick={handleOpenButton} />
					<Button icon="file" onClick={handleNewFileButton} />
					
				</Button.Group>
				
					<Button primary onClick={props.onClose}>
						Close
					</Button>
			</div>

			<Header>Saved Scenes</Header>

			{serverError ? (
				<div className="error-message">
					<p>server error:</p>
					<p>{serverError}</p>
				</div>
			) : (
				<List celled>
					{fileList.map((file) => {
						return (
							<List.Item
								key={file.name}
								className={selectedFile === file.name ? 'selected' : ''}
								onClick={() => setSelectedFile(file.name)}
								onDoubleClick={() => props.onOpenFile(file.name)}
							>
								<Image avatar src={FileIcon} />
								<List.Content>
									<List.Header>{file.name}</List.Header>
									&emsp; created{' '}
									{relativeDate(file.createdStamp).toLocaleString()}
									&emsp; modified{' '}
									{relativeDate(file.lastUpdatedStamp).toLocaleString()}
									&emsp; version: &nbsp; {file.version}
								</List.Content>
							</List.Item>
						);
					})}
				</List>
			)}
		</Modal>
	);
};
FileModal.defaultProps = defaultProps;
