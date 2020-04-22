
// import { ILaneData, makeDefaultLanes, modifyLaneCell } from '@musicenviro/ui-elements'
// import { DiatonicStep, IRange, showJSON } from '@musicenviro/base'
// import { createStore } from 'redux'

// // doing this gradually, can move other state in here if it works and we like it.

// export interface IReduxState {
//     stepRange: IRange<DiatonicStep>;
//     lanes: ILaneData[]
// }

// const stepRange = { min: 4, max: 4 }

// export const initialState = {
//     stepRange,
//     lanes: makeDefaultLanes(stepRange)
// }

// export interface IReduxAction {
//     type: 'SET_CELL',
//     laneIndex: number,
//     cellIndex: number,
//     active: boolean
// }

// export const SET_CELL = 'SET_CELL'

// // typescript was a little tricky here.
// // 1. state in reducer must allow undefined
// // 2. createStore must have 4 generic types, can't be just 2

// export function reducer(_state: IReduxState | undefined, action: IReduxAction): IReduxState {
//     const state = _state || initialState

//     switch (action.type) {
//         case SET_CELL:
//             return {
//                 ...state,
//                 lanes: modifyLaneCell(state.lanes, action.laneIndex, action.cellIndex, action.active)
//             }
            
//         default: return state
//     }
// }

// export const store = createStore<IReduxState, IReduxAction, unknown, unknown>(reducer, initialState)




