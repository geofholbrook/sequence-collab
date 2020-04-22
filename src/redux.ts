
import { ILaneData, makeDefaultLanes, modifyLaneCell } from '@musicenviro/ui-elements'
import { DiatonicStep, IRange } from '@musicenviro/base'
import { createStore } from 'redux'

// doing this gradually, can move other state in here if it works and we like it.

export interface IReduxState {
    stepRange: IRange<DiatonicStep>;
    lanes: ILaneData[]
}

const stepRange = { min: 4, max: 14 }

export const initialState = {
    stepRange,
    lanes: makeDefaultLanes(stepRange)
}

export const SET_CELL = 'SET_CELL'
export const LOAD_STATE = 'LOAD_STATE'

export interface IReduxAction {
    type: 'SET_CELL' | 'LOAD_STATE',
}

export interface IReduxSetCellAction extends IReduxAction {
    type: 'SET_CELL',
    laneIndex: number,
    cellIndex: number,
    active: boolean
}

export interface IReduxLoadStateAction extends IReduxAction {
    type: 'LOAD_STATE',
    state: IReduxState
}

// typescript was a little tricky here.
// 1. state in reducer must allow undefined
// 2. createStore must have 4 generic types, can't be just 2

export function reducer(_state: IReduxState | undefined, _action: IReduxAction): IReduxState {
    const state = _state || initialState

    switch (_action.type) {
        case SET_CELL:
            {const action = _action as IReduxSetCellAction
            return {
                ...state,
                lanes: modifyLaneCell(state.lanes, action.laneIndex, action.cellIndex, action.active)
            }}

        case LOAD_STATE:
            { 
                const action = _action as IReduxLoadStateAction
                return action.state
            }
            
        default: return state
    }
}

export const store = createStore<IReduxState, IReduxAction, unknown, unknown>(reducer, initialState)




