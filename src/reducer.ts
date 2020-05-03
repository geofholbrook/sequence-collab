import { modifyLaneCell } from '@musicenviro/ui-elements';
import { IReduxState, IRollLane, IDrumLane } from './@types';
import {
	IReduxAction,
	initialState,
	ISetRootPropertyAction,
	IReduxSetCellAction,
	IAddLaneAction,
	IDeleteLaneAction,
	ISetLanePropertyAction,
	IReduxLoadStateAction,
	IReduxSetUserAction,
} from './redux';

// typescript was a little tricky here.
// 1. state in reducer must allow undefined
// 2. createStore must have 4 generic types, can't be just 2

export function reducer(_state: IReduxState | undefined, _action: IReduxAction): IReduxState {
	const state = _state || initialState;

	// access to after state, for debugging
	const after = reduce();
	return after;

	function reduce() {
		switch (_action.type) {
			case 'SET_ROOT_PROPERTY': {
				const action = _action as ISetRootPropertyAction;
				return {
					...state,
					[action.propertyName]: action.value,
				};
			}
			case 'SET_CELL': {
				const action = _action as IReduxSetCellAction;
				return {
					...state,
					drumLanes: state.drumLanes.map((lane, li) => {
						if (li !== action.laneIndex) return lane;
						if (lane.laneType !== 'DiatonicPianoRoll') {
							throw new Error(`SET_CELL called on lane of type ${lane.laneType}`);
						}
                        
                        const rollLane = lane as IRollLane;
                        
                        return {
							...rollLane,
							rows: modifyLaneCell(
								rollLane.rows,
								action.rowIndex,
								action.cellIndex,
								action.active,
							),
						};
					}),
				};
			}
			case 'ADD_LANE': {
				const action = _action as IAddLaneAction;
				if (action.lane.laneType !== 'SingleNoteLane') {
					throw new Error('only SingleNoteLane lane type is implemented');
				}
				return {
					...state,
					drumLanes: [...state.drumLanes, action.lane as IDrumLane],
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
				const newState = {
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
				return newState;
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
}
