import { makeDefaultLanes } from '@musicenviro/ui-elements';
import { createStore, Dispatch, Store } from 'redux';
import { socketClient } from './socketClient';
import { IMessage, ILane, IReduxState, ISavedState } from './@types';
import { newLaneForSynth } from './state-helpers/newLaneForSynth';
import { drumSynths, noteSynths } from './sound-generation/synths';
import { reducer } from './reducer';

// doing this gradually, can move other state in here if it works and we like it.


export const initialState: IReduxState = {
	user: 'unknown',
	saveState: 'Clean',
	remoteMouse: null,
	// lanes: makeDefaultLanes(defaultStepRange),
	drumLanes: [
		newLaneForSynth(noteSynths[0].name),
		newLaneForSynth(drumSynths[0].name),
	],
};

export interface IReduxAction {
	type:
		| 'SET_ROOT_PROPERTY'
		| 'SET_CELL'
		| 'LOAD_STATE'
		| 'SET_USER'
		| 'SET_DRUM_LANES'
		| 'ADD_LANE'
		| 'DELETE_LANE'
		| 'SET_LANE_PROPERTY';
	broadcast?: boolean;
}

export interface ISetRootPropertyAction extends IReduxAction {
	type: 'SET_ROOT_PROPERTY';
	propertyName: 'remoteMouse' | 'saveState';
	value: any;
}

export interface IReduxSetCellAction extends IReduxAction {
	type: 'SET_CELL';
	laneIndex: number;
	rowIndex: number;
	cellIndex: number;
	active: boolean;
}

export interface IReduxSetDrumLanesAction extends IReduxAction {
	type: 'SET_DRUM_LANES';
	drumLanes: ILane[];
}

export interface IReduxLoadStateAction extends IReduxAction {
	type: 'LOAD_STATE';
	state: ISavedState;
}

export interface IReduxSetUserAction extends IReduxAction {
	type: 'SET_USER';
	user: string;
}

export interface IAddLaneAction extends IReduxAction {
	type: 'ADD_LANE';
	lane: ILane;
}

export interface IDeleteLaneAction extends IReduxAction {
	type: 'DELETE_LANE';
	laneIndex: number;
}

export interface ISetLanePropertyAction extends IReduxAction {
	type: 'SET_LANE_PROPERTY';
	laneIndex: number;
	property: 'synthName' | 'loopTimes' | 'muted';
	value: any;
}

export type AppStore = Store<IReduxState, IReduxAction>;

export function createAppStore() {
	const store = createStore<IReduxState, IReduxAction, unknown, unknown>(reducer, initialState);

	// =============================================================================
	// modify store.dispatch to update the server, optionally
	// maybe this is supposed to be an "enhancer"? or "middleware"?
	// =============================================================================

	const originalDispatch = store.dispatch;

	store.dispatch = ((action: IReduxAction) => {
		if (action.broadcast) {
			const payload: IMessage = {
				user: store.getState().user,
				type: 'ReduxAction',
				content: action,
			};

			socketClient.send(payload);
		}

		if (
			['SET_CELL', 'SET_DRUM_LANES', 'ADD_LANE', 'DELETE_LANE', 'SET_LANE_PROPERTY'].includes(
				action.type,
			)
		) {
			store.dispatch({
				type: 'SET_ROOT_PROPERTY',
				propertyName: 'saveState',
				value: 'Dirty',
			});
		}

		return originalDispatch(action);
	}) as Dispatch<IReduxAction>;

	return store;
}
