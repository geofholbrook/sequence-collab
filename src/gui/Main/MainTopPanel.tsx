import React from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { RhythmTreeEditor, tree44, IRhythmTree } from '@musicenviro/ui-elements';
import { connect } from 'react-redux';
import { IReduxState } from '../../@types';
import { Dispatch } from 'redux';
import { IReduxAction } from '../../redux';

interface IMainTopPanelProps {
	onTrash: () => void;
	onAddDrum: () => void;
	onAddDiatonic: () => void;
	onStop: () => void;
	onStart: () => void;
	onInvite: () => void;
	onRotateLeft: () => void;
	onRotateRight: () => void;

	masterRhythmTree: IRhythmTree;
	onTreeChange: (newTree: IRhythmTree) => void;
}

export const MainTopPanel = connect(
	// map state to props
	(state: IReduxState) => ({
		masterRhythmTree: state.masterRhythmTree,
	}),

	// map dispatch to props
	(dispatch: Dispatch<IReduxAction>) => ({
		onTreeChange: (tree: IRhythmTree) =>
			dispatch({
				type: 'SET_MASTER_TREE',
				tree,
			}),
	}),

	// component def
)((props: IMainTopPanelProps) => {
	const [extraButtonRow, setExtraButtonRow] = React.useState<boolean>(false);
	const [showRhythmTree, setShowRhythmTree] = React.useState<boolean>(true);

	return (
		<div className="main-top-panel">
			<Grid style={{ padding: 0 }} rows={extraButtonRow ? 2 : 1} columns={2}>
				<Grid.Row columns={2}>
					<Grid.Column width={1}>
						{/* <Icon
							floated="left"
							style={{ color: 'white', paddingTop: 3, width: 20, height: 30 }}
							onClick={() => setExtraButtonRow(!extraButtonRow)}
							name="wrench"
						/> */}

						<RhythmTreeButton onClick={() => setShowRhythmTree(!showRhythmTree)} />
					</Grid.Column>
					<Grid.Column width={15}>
						<Button icon="trash" floated="left" onClick={props.onTrash} />
						<Button icon circular floated="left" onClick={props.onAddDrum}>
							<Icon name="plus" color="blue" /> Drum
						</Button>
						<Button icon circular floated="left" onClick={props.onAddDiatonic}>
							<Icon name="plus" color="green" /> Diatonic
						</Button>
						<Button icon onClick={props.onStop}>
							<Icon name="stop" color="red" />
						</Button>
						<Button icon onClick={props.onStart}>
							<Icon name="play" color="green" />
						</Button>

						<Button icon floated="right" labelPosition="left" onClick={props.onInvite}>
							Invite
							<Icon name="user plus" />
						</Button>

						<Button icon floated="right" onClick={props.onRotateRight}>
							<Icon name="share" />
						</Button>
						<Button icon floated="right" onClick={props.onRotateLeft}>
							<Icon name="reply" />
						</Button>
					</Grid.Column>
				</Grid.Row>

				{extraButtonRow && (
					<Grid.Row columns={1} style={{ marginTop: -23 /* hack */ }}>
						<Grid.Column>
							{/* <Button icon floated="left" onClick={() =>
								setShowRhythmTree(!showRhythmTree)
								}>
								<Icon name="grid layout" />
							</Button> */}
						</Grid.Column>
					</Grid.Row>
				)}

				{showRhythmTree && (
					<RhythmTreeEditor
						initialTree={props.masterRhythmTree}
						width={860}
						height={250}
						onChange={tree => {
							props.onTreeChange(tree)

						}}
					/>
				)}
			</Grid>
		</div>
	);
});

function RhythmTreeButton(props: { onClick: () => void }) {
	return (
		<Button icon floated="left" onClick={props.onClick} title="Show/Hide Rhythm Tree Editor">
			<Icon name="grid layout" />
		</Button>
	);
}
