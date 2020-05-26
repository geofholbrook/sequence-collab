import React from 'react';
import ReactModal, { Styles } from 'react-modal';
import { Button } from 'semantic-ui-react';


interface IFileModelProps {
    isOpen: boolean;
    fileNames: string[];
    onClose: () => void;
}

const defaultProps: Required<IFileModelProps> = {
    isOpen: false,
    fileNames: [],
    onClose: () => {}
} 

export const FileModal: React.FunctionComponent<IFileModelProps> = (props) => {
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
			<div className="button-footer">


				<Button className="close-button" onClick={props.onClose}>
					Close
				</Button>
			</div>
		</ReactModal>
	);
};
FileModal.defaultProps = defaultProps
