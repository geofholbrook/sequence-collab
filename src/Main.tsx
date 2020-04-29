import React from 'react';
import _ from 'lodash';
import { Beforeunload } from 'react-beforeunload';
import { Button, Icon } from 'semantic-ui-react';

import { IPoint, DiatonicStep, IRange } from '@musicenviro/base';
import { DiatonicPianoRoll, ILaneData } from '@musicenviro/ui-elements';

import { ILane } from './@types';
import { drumSynths } from './sound-generation/synths';
import { newLaneForSynth } from './state/newLaneForSynth';
import { SJDrumLane } from './components/SJDrumLane';
import { socketClient } from './socketClient';
import { local } from './config';

import Cursor from './resources/cursor_PNG99.png';
import './Main.css';

interface IMainProps {
	userInfo: { name: string };
	drumLanes: ILane[];
	lanes: ILaneData[];
	stepRange: IRange<DiatonicStep>

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;

	// dispatch mappings
	setCell: (laneIndex: number, cellIndex: number, active: boolean) => void;
	setDrumLanes: (drumLanes: ILane[]) => void;
	addLane: (lane: ILane) => void;
	deleteLane: (index: number) => void;
	setLaneProperty: (
		index: number,
		property: 'synthName' | 'loopTimes' | 'muted',
		value: any,
	) => void;
}

interface IMainState {
	remoteMouse: IPoint;
	saveState: 'Clean' | 'Dirty' | 'WaitingForSave';
}

export class Main extends React.Component<IMainProps, IMainState> {

	constructor(props: IMainProps) {
		super(props);

		this.state = {
			remoteMouse: { x: -10, y: -10 },
			saveState: 'Clean',
		};

		socketClient.onConnected(() => {
			setInterval(() => this.reportMousePosition(), 100);
		});
	}



	// ----------------------------------------------------------------------------
	// piano roll
	// ----------------------------------------------------------------------------

	handlePianoRollCellChange(laneIndex: number, cellIndex: number, active: boolean) {
		console.log('cell change')
		this.setState({
			saveState: 'Dirty',
		});

		this.props.setCell(laneIndex, cellIndex, active);
	}

	// ----------------------------------------------------------------------------
	// drums
	// ----------------------------------------------------------------------------
	handleManualNoteChange(laneIndex: number, notes: number[]) {
		this.setLaneLoopTimes(laneIndex, notes);
	}

	setLaneLoopTimes(laneIndex: number, loopTimes: number[]) {
		this.props.setLaneProperty(laneIndex, 'loopTimes', loopTimes);
	}

	handleManualInstrumentChange(laneIndex: number, synthName: string) {
		this.props.setLaneProperty(laneIndex, 'synthName', synthName);
	}

	handleManualAddLane() {
		const prevSynthIndex = drumSynths
			.map((synth) => synth.name)
			.indexOf(_.last(this.props.drumLanes)?.synthName || '');

		const newSynth = drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;

		this.doAddLaneWithSynth(newSynth);
	}

	handleManualDeleteLane = (laneIndex: number) => {
		this.props.deleteLane(laneIndex);
	};

	toggleMute = (laneIndex: number) => {
		const prevMuteState = this.props.drumLanes[laneIndex].muted;
		this.props.setLaneProperty(laneIndex, 'muted', !prevMuteState);
	};

	private doAddLaneWithSynth(newSynth: string) {
		this.props.addLane(newLaneForSynth(newSynth));
	}



	mousePosition: IPoint = { x: -10, y: -10 };

	reportMousePosition() {
		socketClient.send({
			user: this.props.userInfo.name,
			type: 'MousePosition',
			content: this.mousePosition,
		});
	}

	handleMouseMove(event: React.MouseEvent) {
		this.mousePosition = { x: event.clientX, y: event.clientY };
	}

	render() {
		return (
			<div className="Screen" onMouseMove={(event) => this.handleMouseMove(event)}>
				<header>
					logged in as{' '}
					<span style={{ color: 'lightblue' }}>{this.props.userInfo.name}</span>
					{this.state.saveState !== 'Clean' && (
						<span className="unsaved-alert">
							{this.state.saveState === 'WaitingForSave'
								? 'SAVING'
								: 'UNSAVED CHANGES'}
						</span>
					)}
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

					<DiatonicPianoRoll
						width={600}
						height={300}
						stepRange={this.props.stepRange}
						initialLanes={this.props.lanes}
						onCellChange={(laneIndex, cellIndex, active) =>
							this.handlePianoRollCellChange(laneIndex, cellIndex, active)
						}
					/>

					<SJDrumLane
						index={this.props.drumLanes.length}
						isPlaceHolder={true}
						onAddLane={() => this.handleManualAddLane()}
					></SJDrumLane>

					{this.props.drumLanes.slice()
						.map((lane, i) => (
							<SJDrumLane
								index={i}
								availableInstruments={drumSynths.map((synth) => synth.name)}
								synthName={lane.synthName}
								notes={lane.loopTimes}
								key={'lane' + i}
								onChange={(notes) => this.handleManualNoteChange(i, notes)}
								onInstrumentChange={(name) =>
									this.handleManualInstrumentChange(i, name)
								}
								onDeleteLane={this.handleManualDeleteLane}
								isMuted={lane.muted}
								onMuteButton={() => this.toggleMute(i)}
								noteColor={lane.color}
							/>
						))}
				</div>

				<img
					src={Cursor}
					id="remote-mouse"
					alt=""
					style={{
						// backgroundColor: 'blue',
						opacity: 0.3,
						position: 'fixed',
						left: this.state.remoteMouse.x,
						top: this.state.remoteMouse.y,
						height: 20,
						width: 20,
					}}
				/>

				{!local && this.state.saveState !== 'Clean' && (
					<Beforeunload onBeforeunload={() => "This message doesn't seem to appear"} />
				)}
			</div>
		);
	}
}

