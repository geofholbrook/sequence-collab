import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { Button, List, Image, Header } from 'semantic-ui-react';
import FileIcon from './resources/iconmonstr-party-21-240.png';
import { Timestamp } from '@musicenviro/base';
import { IFileDescription } from '../../@types';
import { requestFileListForUser } from '../../client/rest/requests';

Modal.setAppElement('#root');

interface IFileModelProps {
	isOpen: boolean;
	username: string;
	onClose: () => void;
}

const defaultProps: Required<IFileModelProps> = {
	isOpen: false,
	username: '',
	onClose: () => {},
};

export const FileModal: React.FunctionComponent<IFileModelProps> = (props) => {
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

	return (
		<Modal isOpen={props.isOpen} style={style} onAfterOpen={handleAfterOpen}>
			
			<div className="button-header">
				<Button className="close-button" onClick={props.onClose}>
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
							>
								<Image avatar src={FileIcon} />
								<List.Content>
									<List.Header>{file.name}</List.Header>
									&emsp; created: &nbsp;{' '}
									{new Date(file.createdStamp).toLocaleString()}
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
