import { modifyLaneCell } from '@musicenviro/ui-elements';
import { IReduxState, IRollLane, IDrumLane } from './@types';
import {
	IReduxAction,
	ISetRootPropertyAction,
	IReduxSetCellAction,
	IAddLaneAction,
	IDeleteLaneAction,
	ISetLanePropertyAction,
	IReduxLoadStateAction,
	IReduxSetUserAction,
} from './redux';
import { initialState } from "./initialState";

// typescript was a little tricky here.
// 1. state in reducer must allow undefined
// 2. createStore must have 4 generic types, can't be just 2

export function reducer(_state: IReduxState | undefined, _action: IReduxAction): IReduxState {
	const state = _state || initialState;

	// access to after state, for debugging
	const after = reduce();
	return after;

	function reduce(): IReduxState {
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
					lanes: state.lanes.map((lane, li) => {
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
				
				return {
					...state,
					lanes: [...state.lanes, action.lane as IDrumLane].sort((a,b) => a.laneType.localeCompare(b.laneType)),
				};
			}
			case 'DELETE_LANE': {
				const action = _action as IDeleteLaneAction;
				return {
					...state,
					lanes: [
						...state.lanes.slice(0, action.laneIndex),
						...state.lanes.slice(action.laneIndex + 1),
					],
				};
			}
			case 'SET_LANE_PROPERTY': {
				const action = _action as ISetLanePropertyAction;
				const newState = {
					...state,
					lanes: state.lanes.map((drumLane, i) =>
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
