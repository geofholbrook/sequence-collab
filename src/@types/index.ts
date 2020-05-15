import { IPoint } from "@musicenviro/base";
import { IReduxAction } from "../redux";

export * from './api'
export * from './state'
export * from './sound'

export type PropTime = number
export type Seconds = number
export type Timestamp = number

export interface ISynthNote {
	synthName: string;
	args: any[];
}

export interface IMessage {
    type: 'MousePosition' | 'SessionInfo' | 'ReduxAction';
    user?: string;
    content: IPoint | ISession | IReduxAction
}

export interface ISession {
    id: string;
    host: string;
    guests: string[];
    createdStamp: Timestamp
}

export interface IOnlineUser {
    name: string;
    sessionId: string;
}