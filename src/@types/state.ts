/**
 * this file defines the state and the file format for scenes.
 * when we have to change it:
 *      1. copy the current definitions and identify by version number
 *      2. bump currentSceneVersion and make changes
 *      3. update backwardCompat function
 */

import { PropTime, ISession } from "./index";
import { IRange, DiatonicStep, IPoint, MidiPitch, Mode } from "@musicenviro/base";
import { ILaneData } from "@musicenviro/ui-elements";
import { IRhythmTree } from "@musicenviro/ui-elements";

export type LaneProperties = 'synthName' | 'notes' | 'muted' | 'volumeDb' | 'color';

export const currentSceneVersion = "0.3";

export interface ISavedState {
    masterRhythmTree: IRhythmTree,
    lanes: Array<IDrumLane | IRollLane>;
}

export type SaveState = 'Clean' | 'Dirty' | 'WaitingForSave';

export interface IReduxState extends ISavedState {
    user: string;
    sessionInfo?: ISession;
    remoteMouse: IPoint | null;
	saveState: SaveState;
}

export function getStateToSave(state: IReduxState): ISavedState {
    return {
        masterRhythmTree: state.masterRhythmTree,
        lanes: state.lanes
    }
}

export type LaneType = 'SingleNoteLane' | 'DiatonicPianoRoll';

export interface ILane {
    laneId: string; // 0.2.3 adds this.
    laneType: LaneType;
    synthName: string;
    volumeDb: number; // db
    muted: boolean;
}

export interface INote {
    treePointIndex: number
    // room for other properties
}

export interface IDrumLane extends ILane {
    laneType: 'SingleNoteLane',
    color: string;
    rhythmTree: IRhythmTree;
    treeLoopTimes: PropTime[];
    notes: INote[];
}

export interface IRollLane extends ILane {
    laneType: 'DiatonicPianoRoll',
    rhythmTree: IRhythmTree;
    rows: ILaneData[],
    stepRange: IRange<DiatonicStep>;
	zeroPitch: MidiPitch; // the pitch class of zeroPitch is the key
	mode: Mode;
}

export interface IScene {
    version: string;
    name: string;
    reduxState: ISavedState;  // of course, very unsatisfactory, to be redesigned
}

