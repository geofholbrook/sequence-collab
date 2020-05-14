import React from 'react';
import ReactDOM from 'react-dom';
import { GUIConnected } from './gui/Gui';
import { Provider } from 'react-redux';
import { createAppStore, ISetRootPropertyAction, IReduxAction } from './redux';
import { saveWorkingScene } from './client/workingScene';
import { saveInterval } from './config';
import { IMessage, ISynthNote, SaveState } from './@types';
import { socketClient, initSocketClient } from './socketClient';
import _ from 'lodash';
import { Scheduler } from './sound-generation/Scheduler/Scheduler';
import { IPoint, enableUseWatch } from '@musicenviro/base';
import { synths, callSynth } from './sound-generation/synths';
import * as Tone from 'tone';
import { getLoopNotesForLane } from './sound-generation/getLoopNotesForLane';
import { initSamplers } from './sound-generation/sampler';

class App {
	store = createAppStore();
	saveTimer = setInterval(() => saveWorkingScene(this.store), saveInterval);

	scheduler = new Scheduler<ISynthNote>();
	ac!: AudioContext;

	init() {
		this.initGUI();

		this.store.subscribe(() => {
			this.updateSchedule();
		});
	}

	initGUI() {
		enableUseWatch();

		ReactDOM.render(
			<Provider store={this.store}>
				<GUIConnected
					onStartAudio={() => this.startAudio()}
					onStopAudio={() => this.stopAudio()}
					onMousePositionUpdate={(pos) => this.reportMousePosition(pos)}
					onLogin={(username: string) => {
						initSocketClient(username);
						socketClient.onMessage((message) => this.handleServerMessage(message));
					}}
				/>
			</Provider>,
			document.getElementById('root'),
		);
	}

	startAudio = async () => {
		if (this.ac) {
			this.ac.resume();
			this.scheduler.start();
		} else {
			this.ac = new AudioContext();

			if (!this.ac.audioWorklet) {
				throw new Error('CONTEXT MISSING AUDIOWORKLET')
			}

			Tone.setContext(this.ac);
			this.scheduler.setAudioContext(this.ac);
			
			synths.forEach((synth) => synth.init && synth.init(this.ac));

			this.scheduler.onSchedule((notes) => {
				notes.forEach((note) => {
					const synth = synths.find((s) => s.name === note.data.synthName);
					synth && callSynth(this.ac, synth, note.audioContextTime, ...note.data.args);
				});
			});

			await initSamplers(this.ac)
			this.startAudio()
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
				content: pos,
			});
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
			...reduxState.lanes.filter((lane) => !lane.muted).map(getLoopNotesForLane),
		);

		this.scheduler.setLoop(newLoop);
	}
}

const app = new App();
app.init();
