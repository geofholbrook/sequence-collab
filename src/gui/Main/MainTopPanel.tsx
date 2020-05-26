import React from 'react';
import { Button, Icon, Grid, Input } from 'semantic-ui-react';
import { RhythmTreeEditor, tree44, IRhythmTree } from '@musicenviro/ui-elements';
import { connect } from 'react-redux';
import { IReduxState } from '../../@types';
import { Dispatch } from 'redux';
import { IReduxAction, ISetMasterTreeAction, ISetRootPropertyAction } from '../../redux';
import { tree_44_16ths, tree_44_triplets, tree_34_16ths } from '../../state-helpers/treePresets';
import { consoleDeleteMe } from '@musicenviro/base';

interface IMainTopPanelProps {
	onTrash: () => void;
	onAddDrum: () => void;
	onAddDiatonic: () => void;
	onStop: () => void;
	onStart: () => void;
	onRotateLeft: () => void;
	onRotateRight: () => void;
	onInvite: () => void;
	onFileButton: () => void;

	masterRhythmTree: IRhythmTree;
	masterTempo: number;
	onTreeChange: (newTree: IRhythmTree) => void;
	onTempoChange: (newTempo: number) => void;
}

export const MainTopPanel = connect(
	// map state to props
	(state: IReduxState) => ({
		masterRhythmTree: state.masterRhythmTree,
		masterTempo: state.masterTempo,
	}),

	// map dispatch to props
	(dispatch: Dispatch<IReduxAction>) => ({
		onTreeChange: (newTree: IRhythmTree) => {
			const action: ISetMasterTreeAction = {
				type: 'SET_MASTER_TREE',
				tree: newTree,
			};
			dispatch(action);
		},

		onTempoChange: (newTempo: number) => {
			const action: ISetRootPropertyAction = {
				type: 'SET_ROOT_PROPERTY',
				propertyName: 'masterTempo',
				value: newTempo,
			};
			dispatch(action);
		},
	}),

	// component def
)((props: IMainTopPanelProps) => {
	const [extraButtonRow, setExtraButtonRow] = React.useState<boolean>(false);
	const [showRhythmTree, setShowRhythmTree] = React.useState<boolean>(false);

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

						<Input
							label={{ content: 'bpm' }}
							labelPosition="right"
							style={{fontSize: "12px", height: 25, width: 50, marginTop: -5}}
							placeholder={props.masterTempo}
							onChange={e => props.onTempoChange(parseFloat(e.target.value))}
						/>

						<Button icon floated="right" onClick={props.onFileButton}>
							<Icon name="save" />
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
					<div className="rhythm-panel" style={{ display: 'inline-flex' }}>
						<div style={{ height: 250, width: 330, color: 'white', padding: 20 }}>
							<p>presets:</p>
							<Button circular onClick={() => props.onTreeChange(tree_44_16ths)}>
								4/4 16ths
							</Button>
							<Button circular onClick={() => props.onTreeChange(tree_44_triplets)}>
								4/4 triplets
							</Button>
							<Button circular onClick={() => props.onTreeChange(tree_34_16ths)}>
								3/4 16ths
							</Button>
						</div>
						<RhythmTreeEditor
							initialTree={props.masterRhythmTree}
							height={250}
							onChange={(tree) => {
								props.onTreeChange(tree);
							}}
						/>
					</div>
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
