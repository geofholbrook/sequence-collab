import React from 'react';
import _ from 'lodash';
import { Beforeunload } from 'react-beforeunload';
import { Button, Icon } from 'semantic-ui-react';

import { IPoint } from '@musicenviro/base';

import { ILane, SaveState, IRollLane, IDrumLane } from '../../@types';
import { drumSynths, noteSynths } from '../../sound-generation/synths';
import { newLaneForSynth } from '../../state-helpers/newLaneForSynth';
import { DrumLane } from '../components/DrumLane';
import { local } from '../../config';

import Cursor from './resources/cursor_PNG99.png';
import './resources/Main.css';
import { connect } from 'react-redux';
import { mapStateToMainProps } from './mapStateToMainProps';
import { mapDispatchToMainProps } from './mapDispatchToMainProps';
import { SaveStateDisplay } from './SaveStateDisplay';
import { RollLane } from '../components/RollLane';

interface IMainProps {
	userInfo: { name: string };
	saveState: SaveState;

	drumLanes: ILane[];
	remoteMouse: IPoint | null;

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;
	onMousePositionUpdate: (point: IPoint) => void;

	// dispatch mappings
	setCell: (laneIndex: number, rowIndex: number, cellIndex: number, active: boolean) => void;
	addLane: (lane: ILane) => void;
	deleteLane: (index: number) => void;
	setLaneProperty: (
		index: number,
		property: 'synthName' | 'loopTimes' | 'muted',
		value: any,
	) => void;
}

export class Main extends React.Component<IMainProps> {
	constructor(props: IMainProps) {
		super(props);
		setInterval(() => this.reportMousePosition(), 100);
	}

	componentDidMount() {
		console.log('MAIN MOUNTING');
	}

	// ----------------------------------------------------------------------------
	// piano roll
	// ----------------------------------------------------------------------------

	handlePianoRollCellChange(
		laneIndex: number,
		rowIndex: number,
		cellIndex: number,
		active: boolean,
	) {
		this.props.setCell(laneIndex, rowIndex, cellIndex, active);
	}

	// ----------------------------------------------------------------------------
	// drums
	// ----------------------------------------------------------------------------

	handleManualNoteChange(laneIndex: number, notes: number[]) {
		this.props.setLaneProperty(laneIndex, 'loopTimes', notes);
	}

	handleManualInstrumentChange(laneIndex: number, synthName: string) {
		this.props.setLaneProperty(laneIndex, 'synthName', synthName);
	}

	handleManualAddLane() {
		const prevSynthIndex = drumSynths
			.map((synth) => synth.name)
			.indexOf(_.last(this.props.drumLanes)?.synthName || '');

		const newSynth = drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;

		this.props.addLane(newLaneForSynth(newSynth));
	}

	handleManualDeleteLane = (laneIndex: number) => {
		this.props.deleteLane(laneIndex);
	};

	toggleMute = (laneIndex: number) => {
		const prevMuteState = this.props.drumLanes[laneIndex].muted;
		this.props.setLaneProperty(laneIndex, 'muted', !prevMuteState);
	};

	mousePosition: IPoint = { x: -10, y: -10 };

	reportMousePosition() {
		this.props.onMousePositionUpdate(this.mousePosition);
	}

	handleMouseMove(event: React.MouseEvent) {
		this.mousePosition = { x: event.clientX, y: event.clientY };
	}

	renderLane(lane: ILane, laneIndex: number) {

		const generalProps = {
			index: laneIndex,
			key: 'lane' + laneIndex,
			onInstrumentChange: (name: string) => this.handleManualInstrumentChange(laneIndex, name),
			onDeleteLane: (laneIndex: number) => this.props.deleteLane(laneIndex),
			isMuted: lane.muted,
			onMuteButton: () => this.toggleMute(laneIndex)
		}

		switch (lane.laneType) {
			case 'DiatonicPianoRoll':
				{
					const rollLane = lane as IRollLane;

					return (
						<RollLane
							{...generalProps}
							
							availableInstruments={noteSynths.map((synth) => synth.name)}
							width={600}
							height={300}
							stepRange={rollLane.stepRange}
							initialLanes={rollLane.rows}
							onCellChange={(rowIndex, cellIndex, active) =>
								this.handlePianoRollCellChange(
									laneIndex,
									rowIndex,
									cellIndex,
									active,
								)
							}
						/>
					);
				}
				
			/* <DrumLane
			index={this.props.drumLanes.length}
			isPlaceHolder={true}
			onAddLane={() => this.handleManualAddLane()}
		></DrumLane> */

			case 'SingleNoteLane':
				{
					const drumLane = lane as IDrumLane;
					return (
						<DrumLane
							{...generalProps}
							
							availableInstruments={drumSynths.map((synth) => synth.name)}
							synthName={lane.synthName}
							notes={drumLane.loopTimes}
							onChange={(notes) => this.handleManualNoteChange(laneIndex, notes)}
							noteColor={drumLane.color}
						/>
					);
				}

			default:
				return null;
		}
	}

	render() {
		return (
			<div className="Screen" onMouseMove={(event) => this.handleMouseMove(event)}>
				<header>
					logged in as{' '}
					<span style={{ color: 'lightblue' }}>{this.props.userInfo.name}</span>
					<SaveStateDisplay saveState={this.props.saveState} />
				</header>

				<div className="content">
					<Button.Group basic icon>
						<Button onClick={this.props.onStopAudio}>
							<Icon name="stop" />
						</Button>
						<Button onClick={this.props.onStartAudio}>
							<Icon name="play" color="green" />
						</Button>
					</Button.Group>

					{this.props.drumLanes.map((lane, index) => this.renderLane(lane, index))}
				
				</div>

				{this.props.remoteMouse && (
					<img
						src={Cursor}
						id="remote-mouse"
						alt=""
						style={{
							// backgroundColor: 'blue',
							opacity: 0.3,
							position: 'fixed',
							left: this.props.remoteMouse.x,
							top: this.props.remoteMouse.y,
							height: 20,
							width: 20,
						}}
					/>
				)}

				{!local && this.props.saveState !== 'Clean' && (
					<Beforeunload onBeforeunload={() => "This message doesn't seem to appear"} />
				)}
			</div>
		);
	}
}

export const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);
