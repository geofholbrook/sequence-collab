import { ILaneData, makeDefaultLanes, modifyLaneCell } from '@musicenviro/ui-elements';
import { DiatonicStep, IRange } from '@musicenviro/base';
import { createStore, Dispatch, Store } from 'redux';
import { socketClient } from './socketClient';
import { IMessage, ILane, IReduxState, SaveState, ISavedState } from './@types';
import { newLaneForSynth } from './state/newLaneForSynth';
import { drumSynths } from './sound-generation/synths';

// doing this gradually, can move other state in here if it works and we like it.

const stepRange = { min: 4, max: 21 };

export const initialState: IReduxState = {
	user: 'unknown',
	saveState: 'Clean',
	remoteMouse: null,
	stepRange,
	lanes: makeDefaultLanes(stepRange),
	drumLanes: [newLaneForSynth(drumSynths[0].name)],
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
		| 'SET_LANE_PROPERTY'
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

// typescript was a little tricky here.
// 1. state in reducer must allow undefined
// 2. createStore must have 4 generic types, can't be just 2

export function reducer(_state: IReduxState | undefined, _action: IReduxAction): IReduxState {
	const state = _state || initialState;

	switch (_action.type) {
		case 'SET_ROOT_PROPERTY': {
			const action = _action as ISetRootPropertyAction;
			return {
				...state,
				[action.propertyName]: action.value
			}
		}

		case 'SET_CELL': {
			const action = _action as IReduxSetCellAction;
			return {
				...state,
				lanes: modifyLaneCell(
					state.lanes,
					action.laneIndex,
					action.cellIndex,
					action.active,
				),
			};
		}

		case 'SET_DRUM_LANES': {
			const action = _action as IReduxSetDrumLanesAction;
			return {
				...state,
				drumLanes: action.drumLanes,
			};
		}

		case 'ADD_LANE': {
			const action = _action as IAddLaneAction;
			return {
				...state,
				drumLanes: [...state.drumLanes, action.lane],
			};
		}

		case 'DELETE_LANE': {
			const action = _action as IDeleteLaneAction;
			return {
				...state,
				drumLanes: [
					...state.drumLanes.slice(0, action.laneIndex),
					...state.drumLanes.slice(action.laneIndex + 1),
				],
			};
		}

		case 'SET_LANE_PROPERTY': {
			const action = _action as ISetLanePropertyAction;
			return {
				...state,
				drumLanes: state.drumLanes.map((drumLane, i) =>
					i === action.laneIndex
						? {
								...drumLane,
								[action.property]: action.value,
						  }
						: drumLane,
				),
			};
		}

		case 'LOAD_STATE': {
			const action = _action as IReduxLoadStateAction;
			return {
				...state,
				...action.state,
			};
		}

		case 'SET_USER': {
			const action = _action as IReduxSetUserAction;
			return {
				...state,
				user: action.user,
			};
		}

		default:
			return state;
	}
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

		if (['SET_CELL'
		, 'SET_DRUM_LANES'
		, 'ADD_LANE'
		, 'DELETE_LANE'
		, 'SET_LANE_PROPERTY'].includes(action.type)) {
			store.dispatch({
				type: 'SET_ROOT_PROPERTY',
				propertyName: 'saveState',
				value: 'Dirty'
			})
		}

		return originalDispatch(action);
	}) as Dispatch<IReduxAction>;

	return store;
}
