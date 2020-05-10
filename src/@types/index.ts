import { IPoint } from "@musicenviro/base";
import { IReduxAction } from "../redux";

export * from './api'
export * from './state'
export * from './sound'

export type PropTime = number
export type Seconds = number
export type Timestamp = number

export interface INoteContent {
    sequence: number;
    action: 'Add' | 'Delete'
    laneIndex: number;
    loopTime: PropTime
}

export interface ILaneChangeContent {
    action: 'Delete' | 'Mute' | 'Unmute' | 'ToggleMute'
    laneIndex: number; 
}

export interface INewLaneContent {
    synthName: string
}

export interface IInstrumentChangeContent {
    synthName: string,
    laneIndex: number
}

export interface ISynthNote {
	synthName: string;
	args: any[];
}


export interface IMessage {
    user: string;
    type: 'MousePosition' | 'NoteChange' | 'LaneChange' | 'NewLane' | 'InstrumentChange' | 'ReduxAction';
    content: IPoint | INoteContent | ILaneChangeContent | INewLaneContent | IInstrumentChangeContent | IReduxAction
}


export interface ISession {
    users: string[];
    createdStamp: Timestamp
}

export interface IOnlineUser {
    name: string;
    session: ISession | null;
}