import React from 'react';
import './App.css';

import { MultiNoteLanes } from '@musicenviro/ui-elements';
import { kick, snare, hihat } from './drumSynth';
import { Scheduler, ILoopNote } from './Scheduler/Scheduler';
import { MessageClient } from '@geof/socket-messaging';
import { IMessage, INoteContent } from './@types';
import { IPoint } from '@musicenviro/base';

import Cursor from './resources/cursor_PNG99.png';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

// const testLoop = [
// 	{ data: 1, loopTime: 0 },
// 	{ data: 1, loopTime: 0.5 },
// 	{ data: 1, loopTime: 0.875 },
// ];

const nodeDropletIP = '167.172.3.7';
const local = false;
const serverURL = local ? 'ws://localhost:8080' : `ws://${nodeDropletIP}/ws`;

interface IState {
	otherMouse: IPoint;
}

class App extends React.Component<{userInfo: {name: string}}, IState> {
	
	scheduler = new Scheduler<number>();
	ac!: AudioContext;
	user = 'user' + Math.floor(Math.random() * 10000);
	multiLane = React.createRef<MultiNoteLanes>();

	subLoops: ILoopNote<number>[][] = [[], [], [], []];

	client = new MessageClient<IMessage>(serverURL);

	constructor(props: {userInfo: {name: string}}) {
		super(props);

		this.state = {
			otherMouse: { x: -10, y: -10 },
		};

		// this.scheduler.setLoop(testLoop);

		this.scheduler.onSchedule((notes) =>
			notes.forEach((note) => {
				const fn = [hihat, hihat, snare, kick][note.data];
				fn(this.ac, note.audioContextTime);
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
			this.ac = new AudioContext();
			this.scheduler.setAudioContext(this.ac);
			this.scheduler.start();
		}
	}

	stopAudio() {
		this.ac && this.ac.suspend();
	}

	handleNoteChange(instr: number, notes: number[], broadcast: boolean = true) {
		if (broadcast) {
			const diff = getDiff(
				this.subLoops[instr].map((note) => note.loopTime),
				notes,
			);

			diff.add.forEach((n) =>
				this.client.send({
					user: this.user,
					type: 'NoteChange',
					content: {
						sequence: 0, // not implemented
						action: 'Add',
						instrument: instr,
						loopTime: n,
					},
				}),
			);

			diff.delete.forEach((n) =>
				this.client.send({
					user: this.user,
					type: 'NoteChange',
					content: {
						sequence: 0, // not implemented
						action: 'Delete',
						instrument: instr,
						loopTime: n,
					},
				}),
			);
		}

		this.subLoops[instr] = notes.map((note) => ({
			data: instr,
			loopTime: note,
		}));

		this.scheduler.setLoop(([] as ILoopNote[]).concat(...this.subLoops));
	}

	handleServerMessage(message: IMessage) {
		if (message.user !== this.user) {
			switch (message.type) {
				case 'MousePosition':
					this.setState({
						otherMouse: message.content,
					});
					break;

				case 'NoteChange':
					const change = message.content as INoteContent;

					const newLoopTimes = applyDiff(
						this.subLoops[change.instrument].map((note) => note.loopTime),
						{
							add: change.action === 'Add' ? [change.loopTime] : [],
							delete: change.action === 'Delete' ? [change.loopTime] : [],
						},
					);

					this.multiLane.current?.setNotes(change.instrument, newLoopTimes);

					this.subLoops[change.instrument] = newLoopTimes.map((loopTime) => ({
						data: change.instrument,
						loopTime,
					}));

					this.scheduler.setLoop(([] as ILoopNote[]).concat(...this.subLoops));
					
					break;

				default:
			}
		}
	}

	mousePosition: IPoint = { x: -10, y: -10 };

	reportMousePosition() {
		this.client.send({
			user: this.user,
			type: 'MousePosition',
			content: this.mousePosition,
		});
	}

	handleMouseMove(event: React.MouseEvent) {
		this.mousePosition = { x: event.clientX, y: event.clientY };
	}

	render() {
		return (
			<div className="App" onMouseMove={(event) => this.handleMouseMove(event)}>
				><header>SYNCROJAM {this.props.userInfo.name}</header>
				<div id="main">
					<MultiNoteLanes
						ref={this.multiLane}
						onChange={(instr, notes) => {
							this.handleNoteChange(instr, notes);
						}}
					/>
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

export default App;

function getDiff(prev: number[], curr: number[]) {
	const addedNotes = curr.filter((n) => !prev.includes(n));
	const deletedNotes = prev.filter((n) => !curr.includes(n));

	return {
		add: addedNotes,
		delete: deletedNotes,
	};
}

function applyDiff(orig: number[], diff: { add: number[]; delete: number[] }): number[] {
	let copy = orig.slice();
	copy.push(...diff.add);
	copy = copy.filter((n) => !diff.delete.includes(n));

	return copy;
}
