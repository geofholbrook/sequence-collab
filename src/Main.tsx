import React from 'react';
import _ from 'lodash';
import { Scheduler, ILoopNote } from './Scheduler/Scheduler';

import './Main.css';

import {
	IMessage,
	INoteContent,
	ILaneChangeContent,
	IInstrumentChangeContent,
	INewLaneContent,
	PropTime,
	currentSceneVersion,
} from './@types';

import { Beforeunload } from 'react-beforeunload';

import { ILane, IScene } from './@types';

import { IPoint, showJSON, DiatonicStep, pitchFromStep, IRange } from '@musicenviro/base';
import * as Tone from 'tone';
import Cursor from './resources/cursor_PNG99.png';
import { callSynth, drumSynths, synths } from './sound-generation/synths';
import { SJDrumLane } from './components/SJDrumLane';
import { getDiff, applyDiff } from './diffs';

import { Button, Icon } from 'semantic-ui-react';

import { local, saveInterval } from './config';
import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { newLaneForSynth } from './state/newLaneForSynth';

import { DiatonicPianoRoll, IDiatonicPianoRollProps } from '@musicenviro/ui-elements';

import { store, SET_CELL, LOAD_STATE, initialState } from './redux';
import { socketClient } from './socketClient';
import { userInfo } from 'os';

interface IState {
	lanes: ILane[];
	otherMouse: IPoint;
	saveState: 'Clean' | 'Dirty' | 'WaitingForSave';
}

interface ISynthNote {
	synthName: string;
	args: any[];
}

export class Main extends React.Component<{ userInfo: { name: string } }, IState> {
	scheduler = new Scheduler<ISynthNote>();
	ac!: AudioContext;

	saveTimer = setInterval(() => this.saveWorkingScene(), saveInterval);

	constructor(props: { userInfo: { name: string } }) {
		super(props);

		this.state = {
			otherMouse: { x: -10, y: -10 },
			lanes: [newLaneForSynth(drumSynths[0].name)],
			saveState: 'Clean',
		};

		this.scheduler.onSchedule((notes) =>
			notes.forEach((note) => {
				const synth = synths.find((s) => s.name === note.data.synthName);
				synth && callSynth(this.ac, synth, note.audioContextTime, ...note.data.args);
			}),
		);

		socketClient.onMessage((message) => this.handleServerMessage(message));

		socketClient.onConnected(() => {
			setInterval(() => this.reportMousePosition(), 100);
		});

		store.dispatch({
			type: 'SET_USER',
			user: props.userInfo.name
		})
	}

	componentDidMount() {
		this.loadWorkingScene().then(() => {
			this.updateSchedule();
			this.forceUpdate();
		});

		store.subscribe(() => {
			this.updateSchedule();
			this.forceUpdate();
		});
	}

	async saveWorkingScene() {
		this.setState(
			{
				saveState: 'WaitingForSave',
			},
			async () => {
				const res = await saveSceneToServer(this.props.userInfo.name, {
					version: currentSceneVersion,
					name: 'temp',
					lanes: this.state.lanes,
					reduxState: store.getState(),
				});

				if (res.success) {
					this.setState((prev) =>
						prev.saveState === 'WaitingForSave'
							? {
									saveState: 'Clean',
							  }
							: { saveState: 'Dirty' },
					);
				}
			},
		);
	}

	async loadWorkingScene() {
		const res = await loadSceneFromServer(this.props.userInfo.name, 'temp');
		if (res.success) {
			const scene = res.scene as IScene;
			
			this.setState({
				lanes: scene.lanes,
			});
			
			store.dispatch({
				type: LOAD_STATE,
				state: {
					...(scene.reduxState || initialState),
					user: this.props.userInfo.name
				}
			});
		} else {
			// TODO deal with loading failure.
		}
	}

	startAudio = () => {
		if (this.ac) {
			this.ac.resume();
		} else {
			this.ac = Tone.context.rawContext as AudioContext;
			this.scheduler.setAudioContext(this.ac);
			this.scheduler.start();
		}
	};

	stopAudio = () => {
		this.ac && this.ac.suspend();
	};

	// ----------------------------------------------------------------------------
	// piano roll
	// ----------------------------------------------------------------------------

	handlePianoRollCellChange(laneIndex: number, cellIndex: number, active: boolean) {
		this.setState({
			saveState: 'Dirty'
		})
		
		store.dispatch({
			type: SET_CELL,
			laneIndex,
			cellIndex,
			active,
		});
	}

	// ----------------------------------------------------------------------------
	// drums
	// ----------------------------------------------------------------------------
	handleManualNoteChange(laneIndex: number, notes: number[]) {
		const diff = getDiff(this.state.lanes[laneIndex].loopTimes, notes);
		this.broadcastDiff(diff, laneIndex);
		this.setLaneLoopTimes(laneIndex, notes);
	}

	setLaneLoopTimes(laneIndex: number, loopTimes: number[]) {
		this.setLaneProperty(laneIndex, 'loopTimes', loopTimes);
	}

	handleManualInstrumentChange(laneIndex: number, synthName: string) {
		this.setLaneProperty(laneIndex, 'synthName', synthName);

		socketClient.send({
			user: this.props.userInfo.name,
			type: 'InstrumentChange',
			content: {
				laneIndex,
				synthName,
			} as IInstrumentChangeContent,
		});
	}

	handleManualAddLane() {
		const prevSynthIndex = drumSynths
			.map((synth) => synth.name)
			.indexOf(_.last(this.state.lanes)?.synthName || '');

		const newSynth = drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;

		this.doAddLaneWithSynth(newSynth);

		socketClient.send({
			user: this.props.userInfo.name,
			type: 'NewLane',
			content: {
				synthName: newSynth,
			} as INewLaneContent,
		});
	}

	handleManualDeleteLane = (laneIndex: number) => {
		this.doDeleteLane(laneIndex);

		socketClient.send({
			user: this.props.userInfo.name,
			type: 'LaneChange',
			content: {
				action: 'Delete',
				laneIndex,
			} as ILaneChangeContent,
		});
	};

	toggleMute = (laneIndex: number) => {
		const prevMuteState = this.state.lanes[laneIndex].muted;
		this.setLaneProperty(laneIndex, 'muted', !prevMuteState);
		socketClient.send({
			user: this.props.userInfo.name,
			type: 'LaneChange',
			content: {
				action: prevMuteState ? 'Unmute' : 'Mute',
				laneIndex,
			} as ILaneChangeContent,
		});
	};

	private doAddLaneWithSynth(newSynth: string) {
		this.setLanes([...this.state.lanes, newLaneForSynth(newSynth)]);
	}

	updateSchedule() {
		const reduxState = store.getState();

		const newLoop = _.concat(
			[],
			...this.state.lanes
				.filter((lane) => !lane.muted)
				.map((lane) =>
					lane.loopTimes.map((loopTime) => ({
						data: {
							synthName: lane.synthName,
							args: [],
						},
						loopTime,
					})),
				),
			...(reduxState
				? reduxState.lanes.map(
						(lane, li) =>
							lane.cells
								.map(
									(cell, ci) =>
										cell.active && {
											data: {
												synthName: 'bass',
												args: [getPitch(reduxState.stepRange, li)],
											},
											loopTime: (ci * 1) / 16,
										},
								)
								.filter(Boolean) as ILoopNote<ISynthNote>[],
				  )
				: []),
		);

		this.scheduler.setLoop(newLoop);
	}

	// -----------------------------------------------------------------------------
	// state change helpers
	// -----------------------------------------------------------------------------

	/**
	 * change the state to alter a property of a lane
	 * @param laneIndex
	 * @param property
	 * @param value
	 */
	setLaneProperty(laneIndex: number, property: 'synthName' | 'loopTimes' | 'muted', value: any) {
		const newLanes = this.state.lanes.slice();
		newLanes.splice(laneIndex, 1, {
			...newLanes[laneIndex],
			[property]: value,
		});
		this.setLanes(newLanes);
	}

	/**
	 * change the state to remove a lane
	 * @param laneIndex
	 */
	doDeleteLane(laneIndex: number) {
		const newLanes = this.state.lanes.slice();
		newLanes.splice(laneIndex, 1);
		this.setLanes(newLanes);
	}

	setLanes(newLanes: ILane[]) {
		this.setState(
			{
				lanes: newLanes,
				saveState: 'Dirty',
			},
			() => {
				this.updateSchedule();
			},
		);
	}

	// ----------------------------------------------------------------------------
	// sending and receiving via socket client
	// ----------------------------------------------------------------------------

	/**
	 * broadcast a change or set of changes to loop times for a lane
	 * @param diff a format that includes additions and deletions
	 * @param laneIndex
	 */
	private broadcastDiff(diff: { add: PropTime[]; delete: PropTime[] }, laneIndex: number) {
		diff.add.forEach((n) =>
			socketClient.send({
				user: this.props.userInfo.name,
				type: 'NoteChange',
				content: {
					sequence: 0,
					action: 'Add',
					laneIndex,
					loopTime: n,
				},
			}),
		);
		diff.delete.forEach((n) =>
			socketClient.send({
				user: this.props.userInfo.name,
				type: 'NoteChange',
				content: {
					sequence: 0,
					action: 'Delete',
					laneIndex,
					loopTime: n,
				},
			}),
		);
	}

	handleServerMessage(message: IMessage) {
		if (message.user !== this.props.userInfo.name) {
			switch (message.type) {
				case 'MousePosition':
					this.setState({
						otherMouse: message.content as IPoint,
					});
					break;

				case 'NoteChange':
					{
						const change = message.content as INoteContent;

						const newLoopTimes = applyDiff(
							this.state.lanes[change.laneIndex].loopTimes,
							{
								add: change.action === 'Add' ? [change.loopTime] : [],
								delete: change.action === 'Delete' ? [change.loopTime] : [],
							},
						);

						this.setLaneLoopTimes(change.laneIndex, newLoopTimes);
					}
					break;

				case 'InstrumentChange':
					{
						const change = message.content as IInstrumentChangeContent;
						this.setLaneProperty(change.laneIndex, 'synthName', change.synthName);
					}
					break;

				case 'LaneChange': {
					const change = message.content as ILaneChangeContent;
					switch (change.action) {
						case 'Delete':
							this.doDeleteLane(change.laneIndex);
							break;
						case 'Mute':
							this.setLaneProperty(change.laneIndex, 'muted', true);
							break;
						case 'Unmute':
							this.setLaneProperty(change.laneIndex, 'muted', false);
							break;
						case 'ToggleMute':
							// unused for now
							this.setLaneProperty(
								change.laneIndex,
								'muted',
								!this.state.lanes[change.laneIndex].muted,
							);
							break;
					}
					break;
				}

				case 'NewLane':
					{
						const change = message.content as INewLaneContent;
						this.doAddLaneWithSynth(change.synthName);
					}
					break;

				default:
			}
		}
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
						<Button onClick={this.stopAudio}>
							<Icon name="stop" />
						</Button>
						<Button onClick={this.startAudio}>
							<Icon name="play" color="green" />
						</Button>
					</Button.Group>

					<DiatonicPianoRoll
						width={600}
						height={300}
						stepRange={store.getState().stepRange}
						initialLanes={store.getState().lanes}
						onCellChange={(laneIndex, cellIndex, active) =>
							this.handlePianoRollCellChange(laneIndex, cellIndex, active)
						}
					/>

					<SJDrumLane
						index={this.state.lanes.length}
						isPlaceHolder={true}
						onAddLane={() => this.handleManualAddLane()}
					></SJDrumLane>

					{this.state.lanes.slice().map((lane, i) => (
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
					id="otherguy"
					alt=""
					style={{
						// backgroundColor: 'blue',
						opacity: 0.3,
						position: 'fixed',
						left: this.state.otherMouse.x,
						top: this.state.otherMouse.y,
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



function getPitch(stepRange: IRange<DiatonicStep>, laneIndex: number) {
	const step = stepRange.min + laneIndex
	return pitchFromStep(step, 36, 'Dorian')
}
