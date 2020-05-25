/**
 * this file defines the state and the file format for scenes.
 * when we have to change it:
 *      1. copy the current definitions and identify by version number
 *      2. bump currentSceneVersion and make changes
 *      3. update backwardCompat function
 */

import { PropTime, ISession } from "./index";
import { IRange, DiatonicStep, IPoint, MidiPitch, Mode } from "@musicenviro/base";
import { INote } from "@musicenviro/ui-elements";
import { IRhythmTree } from "@musicenviro/ui-elements";

export type LaneProperties = 'synthName' | 'notes' | 'muted' | 'volumeDb' | 'color';

export const currentSceneVersion = "0.3.1";

export interface ISavedState {
    masterRhythmTree: IRhythmTree,
    masterTempo: number,
    lanes: AnyLane[];
}

export type AnyLane = ISingleNoteLane | IPianoRollLane

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
        masterTempo: state.masterTempo,
        lanes: state.lanes
    }
}

export type LaneType = 'SingleNoteLane' | 'PianoRoll';

export interface ILane {
    laneId: string; // 0.2.3 adds this.
    laneType: LaneType;
    synthName: string;
    volumeDb: number; // db
    muted: boolean;
    color: string;
}

export interface IVoiceLane extends ILane {
    rhythmTree: IRhythmTree;
    treeLoopTimes: PropTime[];
    notes: INote[];
}

export interface ISingleNoteLane extends IVoiceLane {
    laneType: 'SingleNoteLane',
}

export interface IPianoRollLane extends IVoiceLane {
    laneType: 'PianoRoll',
    
    stepRange: IRange<DiatonicStep>;
	zeroPitch: MidiPitch; // the pitch class of zeroPitch is the key
	mode: Mode;
}

export interface IScene<TSavedState = ISavedState> {
    version: string;
    name: string;
    reduxState: TSavedState;  // of course, very unsatisfactory, to be redesigned
}

