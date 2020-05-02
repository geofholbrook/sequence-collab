import React from 'react';
import ReactDOM from 'react-dom';
import { GUIConnected } from './gui/Display';
import { Provider } from 'react-redux';
import { createAppStore, ISetRootPropertyAction, IReduxAction } from './redux';
import { saveWorkingScene } from './client/workingScene';
import { saveInterval } from './config';
import { IMessage, ISynthNote, SaveState } from './@types';
import { socketClient, initSocketClient } from './socketClient';
import _ from 'lodash';
import { ILoopNote, Scheduler } from './sound-generation/Scheduler/Scheduler';
import { IRange, DiatonicStep, pitchFromStep, IPoint } from '@musicenviro/base';
import { synths, callSynth } from './sound-generation/synths';
import * as Tone from 'tone';

class App {
	store = createAppStore();
	saveTimer = setInterval(() => saveWorkingScene(this.store), saveInterval);

	scheduler = new Scheduler<ISynthNote>();
	ac!: AudioContext;

	init() {
		this.scheduler.onSchedule((notes) =>
			notes.forEach((note) => {
				const synth = synths.find((s) => s.name === note.data.synthName);
				synth && callSynth(this.ac, synth, note.audioContextTime, ...note.data.args);
			}),
		);

		this.initGUI();

		this.store.subscribe(() => {
			this.updateSchedule();
		});
	}

	initGUI() {
		ReactDOM.render(
			<Provider store={this.store}>
				<GUIConnected
					onStartAudio={() => this.startAudio()}
					onStopAudio={() => this.stopAudio()}
					onMousePositionUpdate={pos => this.reportMousePosition(pos)}
					onLogin={(username: string) => {
						initSocketClient(username)
						socketClient.onMessage((message) => this.handleServerMessage(message));
					}}
				/>
			</Provider>,
			document.getElementById('root'),
		);
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

	reportMousePosition(pos: IPoint) {
		
		if (socketClient.connection.readyState === socketClient.connection.OPEN) {
			socketClient.send({
				user: this.store.getState().user, 
				type: 'MousePosition',
				content: pos
			})
		}
	}

	setSaveState(state: SaveState) {
		this.store.dispatch({
			type: 'SET_ROOT_PROPERTY',
			propertyName: 'saveState',
			value: state,
		});
	}

	handleServerMessage(message: IMessage) {
		if (message.user !== this.store.getState().user) {
			switch (message.type) {
				case 'MousePosition':
					this.store.dispatch<ISetRootPropertyAction>({
						type: 'SET_ROOT_PROPERTY',
						propertyName: 'remoteMouse',
						value: message.content,
					});
					break;

				case 'ReduxAction':
					{
						const action = message.content as IReduxAction;

						this.store.dispatch({
							...action,
							broadcast: false, // prevents an infinite loop!
						});
					}
					break;

				default:
			}
		}
	}

	updateSchedule() {
		const reduxState = this.store.getState();

		const newLoop = _.concat(
			[],
			...reduxState.drumLanes
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
}

const app = new App();
app.init();

function getPitch(stepRange: IRange<DiatonicStep>, laneIndex: number) {
	const step = stepRange.min + laneIndex;
	return pitchFromStep(step, 36, 'Dorian');
}
