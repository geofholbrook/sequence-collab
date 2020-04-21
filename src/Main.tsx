import React from 'react';
import _ from 'lodash';
import { Scheduler } from './Scheduler/Scheduler';
import { MessageClient } from '@geof/socket-messaging';
import {
	IMessage,
	INoteContent,
	ILaneChangeContent,
	IInstrumentChangeContent,
	INewLaneContent,
	PropTime,
} from './@types';

import { ILane, IScene } from "./@types";

import { IPoint } from '@musicenviro/base';
import * as Tone from 'tone';
import Cursor from './resources/cursor_PNG99.png';
import { callSynth, synths } from './sound-generation/synths';
import { SJDrumLane } from './components/SJDrumLane';
import { getDiff, applyDiff } from './diffs';

import { Button, Icon } from 'semantic-ui-react';

import { local, nodeDropletIP, saveInterval } from './config'
import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { newLaneForSynth } from './state/newLaneForSynth';

const serverURL = local ? 'ws://localhost:8080' : `ws://${nodeDropletIP}/ws`;

interface IState {
	lanes: ILane[];
	otherMouse: IPoint;
}

export class Main extends React.Component<{ userInfo: { name: string } }, IState> {
	scheduler = new Scheduler<string>();
	ac!: AudioContext;
	// multiLane = React.createRef<MultiNoteLanes>();

	client = new MessageClient<IMessage>(serverURL);

	saveTimer = setInterval(() => this.saveWorkingScene(), saveInterval)

	constructor(props: { userInfo: { name: string } }) {
		super(props);

		this.state = {
			otherMouse: { x: -10, y: -10 },
			lanes: [
				newLaneForSynth(synths[0].name)
			],
		};

		this.scheduler.onSchedule((notes) =>
			notes.forEach((note) => {
				const synth = synths.find((s) => s.name === note.data);
				synth && callSynth(this.ac, synth, note.audioContextTime);
			}),
		);

		this.client.onMessage((message) => this.handleServerMessage(message));

		this.client.onConnected(() => {
			setInterval(() => this.reportMousePosition(), 100);
		});
	}

	componentDidMount() {
		this.loadWorkingScene().then(() => {
			this.updateSchedule()
			this.forceUpdate()
		})
	}

	saveWorkingScene() {
		saveSceneToServer(this.props.userInfo.name, {
			name: "temp",
			lanes: this.state.lanes
		} as IScene)
	}

	async loadWorkingScene() {
		const res = await loadSceneFromServer(this.props.userInfo.name, "temp")
		if (res.success) {
			const scene = res.scene as IScene
			this.setState({
				lanes: scene.lanes
			})
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

	handleManualNoteChange(laneIndex: number, notes: number[]) {
		const diff = getDiff(this.state.lanes[laneIndex].loopTimes, notes);
		this.broadcastDiff(diff, laneIndex);
		this.setLaneLoopTimes(laneIndex, notes);
	}

	setLaneLoopTimes(laneIndex: number, loopTimes: number[]) {
		const newLanes = this.state.lanes.slice();

		newLanes.splice(laneIndex, 1, {
			...newLanes[laneIndex],
			loopTimes,
		});

		this.setLanes(newLanes);
	}

	handleManualInstrumentChange(laneIndex: number, synthName: string) {
		this.setLaneProperty(laneIndex, 'synthName', synthName);

		this.client.send({
			user: this.props.userInfo.name,
			type: 'InstrumentChange',
			content: {
				laneIndex,
				synthName,
			} as IInstrumentChangeContent,
		});
	}

	handleManualAddLane() {
		const prevSynthIndex = synths
			.map((synth) => synth.name)
			.indexOf(_.last(this.state.lanes)?.synthName || '');

		const newSynth = synths[(prevSynthIndex + 1) % synths.length].name;

		this.doAddLaneWithSynth(newSynth);

		this.client.send({
			user: this.props.userInfo.name,
			type: 'NewLane',
			content: {
				synthName: newSynth,
			} as INewLaneContent,
		});
	}

	handleManualDeleteLane = (laneIndex: number) => {
		this.doDeleteLane(laneIndex);

		this.client.send({
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
		this.client.send({
			user: this.props.userInfo.name,
			type: 'LaneChange',
			content: {
				action: prevMuteState ? 'Unmute' : 'Mute',
				laneIndex,
			} as ILaneChangeContent,
		});
	};

	private doAddLaneWithSynth(newSynth: string) {
		this.setLanes([
			...this.state.lanes,
			newLaneForSynth(newSynth),
		]);
	}

	updateSchedule() {
		const newLoop = _.concat(
			[],
			...this.state.lanes
				.filter((lane) => !lane.muted)
				.map((lane) =>
					lane.loopTimes.map((loopTime) => ({
						data: lane.synthName,
						loopTime,
					})),
				),
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
			this.client.send({
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
			this.client.send({
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
							this.doDeleteLane(change.laneIndex)
							break;
						case 'Mute':
							this.setLaneProperty(change.laneIndex, 'muted', true)
							break;
						case 'Unmute':
							this.setLaneProperty(change.laneIndex, 'muted', false)
							break
						case 'ToggleMute':
							// unused for now
							this.setLaneProperty(change.laneIndex, 'muted', !this.state.lanes[change.laneIndex].muted)
							break;
					}
					break;
				}

				case 'NewLane': {
					const change = message.content as INewLaneContent;
					this.doAddLaneWithSynth(change.synthName)
				}
				break;

				default:
			}
		}
	}

	mousePosition: IPoint = { x: -10, y: -10 };

	reportMousePosition() {
		this.client.send({
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

					<SJDrumLane
						index={this.state.lanes.length}
						isPlaceHolder={true}
						onAddLane={() => this.handleManualAddLane()}
					></SJDrumLane>

					{this.state.lanes.slice().map((lane, i) => (
						<SJDrumLane
							index={i}
							availableInstruments={synths.map((synth) => synth.name)}
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
			</div>
		);
	}
}

