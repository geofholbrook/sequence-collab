import querystring from 'querystring';
import React from 'react';
import ReactDOM from 'react-dom';
import { GUIConnected } from './gui/Gui';
import { Provider } from 'react-redux';
import {
	createAppStore,
	ISetRootPropertyAction,
	IReduxAction,
	IReduxLoadStateAction,
	IReduxSetUserAction,
} from './redux';
import { saveScene, loadWorkingScene } from './client/workingScene';
import { saveInterval, workingFileName } from './config';
import { IMessage, ISynthNote, SaveState, IRequestSessionEntryResponse, Seconds, getStateToSave } from './@types';
import { socketClient, initSocketClient } from './socketClient';
import _ from 'lodash';
import { Scheduler } from './sound-generation/Scheduler/Scheduler';
import { IPoint, enableUseWatch, consoleDeleteMe } from '@musicenviro/base';
import { synths, callSynth } from './sound-generation/synths';
import * as Tone from 'tone';
import { getLoopNotesForLane } from './sound-generation/getLoopNotesForLane';
import { initSamplers } from './sound-generation/sampler';
import { requestSessionEntry } from './bridge';
import { IRhythmTree, nodeUnitLength } from '@musicenviro/ui-elements';

class App {
	store = createAppStore();
	saveTimer = saveInterval && setInterval(() => saveScene(this.store, workingFileName), saveInterval);

	scheduler = new Scheduler<ISynthNote>();
	ac!: AudioContext;

	inviteSessionId: string | null = null;

	init() {
		this.checkForInviteLink();

		this.initGUI();

		this.store.subscribe(() => {
			this.updateSchedule();
		});
	}

	initGUI() {
		// enableUseWatch();

		ReactDOM.render(
			<Provider store={this.store}>
				<GUIConnected
					onStartAudio={() => this.startAudio()}
					onStopAudio={() => this.stopAudio()}
					onMousePositionUpdate={(pos: IPoint) => this.reportMousePosition(pos)}
					onLogin={async (username: string) => {
						this.store.dispatch<IReduxSetUserAction>({
							type: 'SET_USER',
							user: username,
						});

						if (this.inviteSessionId) {
							const res = (await requestSessionEntry(
								{ guest: username,
								  sessionId: this.inviteSessionId }
							));

							if (res.success) {
								this.store.dispatch<IReduxLoadStateAction>({
									type: 'LOAD_STATE',
									state: res.scene!.reduxState,
								});
							} else {
								alert(res.message);
								await loadWorkingScene(this.store);
							}
						} else {
							await loadWorkingScene(this.store);
						}

						initSocketClient(username);
						socketClient.onMessage((message) => this.handleServerMessage(message));

						return true;
					}}

					onSaveAs={filename => this.handleSaveAs(filename)}

					inviteSessionId={this.inviteSessionId}
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
				throw new Error('CONTEXT MISSING AUDIOWORKLET');
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

			await initSamplers(this.ac);
			this.startAudio();
		}
	};

	stopAudio = () => {
		this.ac && this.ac.suspend();
	};

	reportMousePosition(pos: IPoint) {
		// disable for now
		// if (socketClient.connection.readyState === socketClient.connection.OPEN) {
		// 	socketClient.send({
		// 		user: this.store.getState().user,
		// 		type: 'MousePosition',
		// 		content: pos,
		// 	});
		// }
	}

	setSaveState(state: SaveState) {
		this.store.dispatch({
			type: 'SET_ROOT_PROPERTY',
			propertyName: 'saveState',
			value: state,
		});
	}

	async handleSaveAs(filename: string) {
		consoleDeleteMe('handleSaveAs', filename)
		const action: ISetRootPropertyAction = {
			type: 'SET_ROOT_PROPERTY',
			propertyName: 'sceneName',
			value: filename,
		}
		
		this.store.dispatch(action);
		return saveScene(this.store, action.value)
	}

	checkForInviteLink() {
		const queryRaw = window.location.search;
		if (!queryRaw) return;
		const query = querystring.parse(queryRaw.slice(1)); // remove leading '?' before parse

		if ('invite' in query) {
			this.inviteSessionId = query.invite as string;
		}
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

				case 'SessionInfo':
					// console.log(message.content);
					this.store.dispatch<ISetRootPropertyAction>({
						type: 'SET_ROOT_PROPERTY',
						propertyName: 'sessionInfo',
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

		this.scheduler.loopDuration = calculateLoopLength(
			reduxState.masterRhythmTree,
			reduxState.masterTempo,
		);
		this.scheduler.setLoop(newLoop);
	}
}

const app = new App();
app.init();

function calculateLoopLength(masterTree: IRhythmTree, masterBPM: number) {
	// for the purposes of the bpm value, a 'beat' is considered to be the length of the first node
	// on the top level of the master rhythm tree

	const topUnitLengths = masterTree.nodes.map(nodeUnitLength);
	const totalUnitLength = topUnitLengths.reduce((sum, n) => sum + n, 0);
	const beatDuration: Seconds = 60 / masterBPM;

	return (beatDuration / topUnitLengths[0]) * totalUnitLength;
}
