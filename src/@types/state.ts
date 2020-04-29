/**
 * this file defines the state and the file format for scenes.
 * when we have to change it:
 *      1. copy the current definitions and identify by version number
 *      2. bump currentSceneVersion and make changes
 *      3. update backwardCompat function
 */

import { PropTime } from "./index";
import { IRange, DiatonicStep, IPoint } from "@musicenviro/base";
import { ILaneData } from "@musicenviro/ui-elements";

export const currentSceneVersion = "0.1.0";

export interface ISavedState {
    stepRange: IRange<DiatonicStep>;
	lanes: ILaneData[];
	drumLanes: ILane[];
}

export interface IReduxState extends ISavedState {
    user: string;
    remoteMouse: IPoint | null;
	saveState: 'Clean' | 'Dirty' | 'WaitingForSave';
}

export interface ILane {
    synthName: string;
    loopTimes: PropTime[];
    muted: boolean;
    color: string;
}

export interface IScene {
    version: string;
    name: string;
    reduxState: IReduxState;  // of course, very unsatisfactory, to be redesigned
}

/*
export const currentSceneVersion = "0.0.2";

export interface ILane {
    synthName: string;
    loopTimes: PropTime[];
    muted: boolean;
    color: string;
}

export interface IScene {
    version: string;
    name: string;
    drumLanes: ILane[];
    reduxState: IReduxState;  // of course, very unsatisfactory, to be redesigned
}
*/

/*
export const currentSceneVersion = "0.0.1";

export interface ILane {
    synthName: string;
    loopTimes: PropTime[];
    muted: boolean;
    color: string;
}

export interface IScene {
    version: string;
    name: string;
    lanes: ILane[];
}
*/
