import { IPoint } from "@musicenviro/base";

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

export interface IMessage {
    user: string;
    type: 'MousePosition' | 'NoteChange' | 'LaneChange' | 'NewLane' | 'InstrumentChange';
    content: IPoint | INoteContent | ILaneChangeContent | INewLaneContent | IInstrumentChangeContent
}

export interface ICreateUserParams {
    name: string;
}

export interface ICreateUserResponse {
    success: boolean;
    message: string;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
}

export interface ILane {
	synthName: string;
	loopTimes: PropTime[];
	muted: boolean;
}

export interface ISession {
    users: string[];
    createdStamp: Timestamp
}

export interface IOnlineUser {
    name: string;
    session: ISession | null;
}