import { makeDefaultLanes, IRhythmTree } from '@musicenviro/ui-elements';
import { createStore, Dispatch, Store } from 'redux';
import { socketClient } from './socketClient';
import { IMessage, ILane, IReduxState, ISavedState, LaneProperties, AnyLane } from './@types';
import { reducer } from './reducer';
import { initialState } from './initialState';

export interface IReduxAction {
	type:
		| 'SET_ROOT_PROPERTY'
		| 'SET_CELL'
		| 'LOAD_STATE'
		| 'SET_USER'
		| 'SET_MASTER_TREE'
		| 'ADD_LANE'
		| 'DELETE_LANE'
		| 'ROTATE'
		| 'SET_LANE_PROPERTY';
	broadcast?: boolean;
}

export interface ISetRootPropertyAction extends IReduxAction {
	type: 'SET_ROOT_PROPERTY';
	propertyName: 'remoteMouse' | 'saveState' | 'sessionInfo' | 'masterTempo' | 'sceneName';
	value: any;
}

export interface IRotateAction extends IReduxAction {
	type: 'ROTATE',
	amount: number
}

export interface ISetMasterTreeAction extends IReduxAction {
	type: 'SET_MASTER_TREE',
	tree: IRhythmTree
}

export interface IReduxSetCellAction extends IReduxAction {
	type: 'SET_CELL';
	laneId: string;
	rowIndex: number;
	cellIndex: number;
	active: boolean;
}

export interface IReduxLoadStateAction extends IReduxAction {
	type: 'LOAD_STATE';
	state: ISavedState;
	sceneName?: string;
}

export interface IReduxSetUserAction extends IReduxAction {
	type: 'SET_USER';
	user: string;
}

export interface IAddLaneAction extends IReduxAction {
	type: 'ADD_LANE';
	lane: AnyLane;
	after?: string;
}

export interface IDeleteLaneAction extends IReduxAction {
	type: 'DELETE_LANE';
	laneId: string;
}

export interface ISetLanePropertyAction extends IReduxAction {
	type: 'SET_LANE_PROPERTY';
	laneId: string;
	property: LaneProperties;
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
