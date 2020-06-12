/**
 * this file defines the state and the file format for scenes.
 * when we have to change it:
 *      1. copy the current definitions and identify by version number
 *      2. bump currentSceneVersion and make changes
 *      3. update backwardCompat function
 */


export type LaneProperties = 'synthName' | 'notes' | 'muted' | 'volumeDb' | 'color';

export interface ISavedState_0_4_0 {
    masterRhythmTree: IRhythmTree,
    masterTempo: number,
    lanes: AnyLane[];
}

export type AnyLane = ISingleNoteLane | IPianoRollLane

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
    treeLoopTimes: number[];
    notes: INote[];
}

export interface ISingleNoteLane extends IVoiceLane {
    laneType: 'SingleNoteLane',
}

export interface IPianoRollLane extends IVoiceLane {
    laneType: 'PianoRoll',
    
    stepRange: IRange<number>;
	zeroPitch: number; // the pitch class of zeroPitch is the key
	mode: Mode;
}


// =============================================================================
// copy from @musicenviro/ui-elements)
// =============================================================================

export interface TreeObjectNode {
	id?: number;
	units: number;
	subtree?: IRhythmTree;
}

export type TreeNode = TreeObjectNode | number;

export interface IRhythmTree {
	nodes: TreeNode[]
}

export interface INote {
    treePointIndex: number;
}

export interface ICellData {
	active: boolean;
}

export interface ILaneData {
	gridTree: IRhythmTree;
	cells: ICellData[];
}


// =============================================================================
// copy from @musicenviro/base
// =============================================================================

export type Mode =
	| 'Ionian'
	| 'Dorian'
	| 'Phrygian'
	| 'Lydian'
	| 'Mixolydian'
	| 'Aeolian'
    | 'Lochrian';
    
export interface IRange<T = number> {
    min: T;
    max: T;
    step?: T;
}
    