import React from 'react';
import _ from 'lodash';
import { Scheduler, ILoopNote, PropTime } from './Scheduler/Scheduler';
import { MessageClient } from '@geof/socket-messaging';
import { IMessage, INoteContent } from './@types';
import { IPoint } from '@musicenviro/base';
import * as Tone from 'tone';
import Cursor from './resources/cursor_PNG99.png';
import { callSynth, synths } from './sound-generation/synths';
import { SJDrumLane } from './components/SJDrumLane';
import { getDiff, applyDiff } from './diffs';

// const testLoop = [
// 	{ data: 1, loopTime: 0 },
// 	{ data: 1, loopTime: 0.5 },
// 	{ data: 1, loopTime: 0.875 },
// ];

const nodeDropletIP = '167.172.3.7';
const local = true;
const serverURL = local ? 'ws://localhost:8080' : `ws://${nodeDropletIP}/ws`;

interface ILane {
	synthName: string;
	loopTimes: PropTime[];
}

interface IState {
	lanes: ILane[];
	otherMouse: IPoint;
}

export class Main extends React.Component<{ userInfo: { name: string } }, IState> {
	scheduler = new Scheduler<string>();
	ac!: AudioContext;
	// multiLane = React.createRef<MultiNoteLanes>();

	client = new MessageClient<IMessage>(serverURL);

	constructor(props: { userInfo: { name: string } }) {
		super(props);

		this.state = {
			otherMouse: { x: -10, y: -10 },
			lanes: synths.slice(0, 6).map((synth) => ({
				synthName: synth.name,
				loopTimes: [],
			})),
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

	startAudio() {
		if (this.ac) {
			this.ac.resume();
		} else {
			this.ac = Tone.context.rawContext as AudioContext;
			this.scheduler.setAudioContext(this.ac);
			this.scheduler.start();
		}
	}

	stopAudio() {
		this.ac && this.ac.suspend();
	}

	handleManualNoteChange(laneIndex: number, notes: number[]) {
		const diff = getDiff(this.state.lanes[laneIndex].loopTimes, notes);
		this.broadcastDiff(diff, laneIndex);
		this.setLaneLoopTimes(laneIndex, notes);
	}

	setLaneLoopTimes(laneIndex: number, loopTimes: number[]) {
		const newLanes = this.state.lanes.slice();

		newLanes.splice(laneIndex, 1, {
			synthName: this.state.lanes[laneIndex].synthName,
			loopTimes,
		});

		this.setLanes(newLanes);
	}

	handleManualInstrumentChange(laneIndex: number, synthName: string) {
		const newLanes = this.state.lanes.slice();
		newLanes.splice(laneIndex, 1, {
			synthName,
			loopTimes: newLanes[laneIndex].loopTimes,
		});
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

	private broadcastDiff(diff: { add: number[]; delete: number[] }, laneIndex: number) {
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

	updateSchedule() {
		const newLoop = _.concat(
			[],
			...this.state.lanes.map((lane) =>
				lane.loopTimes.map((loopTime) => ({
					data: lane.synthName,
					loopTime,
				})),
			),
		);

		this.scheduler.setLoop(newLoop);
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
					const change = message.content as INoteContent;

					const newLoopTimes = applyDiff(this.state.lanes[change.laneIndex].loopTimes, {
						add: change.action === 'Add' ? [change.loopTime] : [],
						delete: change.action === 'Delete' ? [change.loopTime] : [],
					});

					this.setLaneLoopTimes(change.laneIndex, newLoopTimes);
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
					SYNCROJAM – logged in as{' '}
					<span style={{ color: 'lightblue' }}>{this.props.userInfo.name}</span>
				</header>

				<div className="content">
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
						/>
					))}

					<button onClick={() => this.startAudio()}>play</button>
					<button onClick={() => this.stopAudio()}>pause</button>
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


