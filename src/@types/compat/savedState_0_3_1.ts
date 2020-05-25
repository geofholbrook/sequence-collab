
export interface ISavedState {
    masterRhythmTree: IRhythmTree,
    masterTempo: number,
    lanes: Array<IDrumLane | IRollLane>;
}

export type LaneType = 'SingleNoteLane' | 'DiatonicPianoRoll';

export interface ILane {
    laneId: string; // 0.2.3 adds this.
    laneType: LaneType;
    synthName: string;
    volumeDb: number; // db
    muted: boolean;
}

export interface IDrumLane extends ILane {
    laneType: 'SingleNoteLane',
    color: string;
    rhythmTree: IRhythmTree;
    treeLoopTimes: number[];
    notes: INote[];
}

export interface IRollLane extends ILane {
    laneType: 'DiatonicPianoRoll',
    rhythmTree: IRhythmTree;
    rows: ILaneData[],
    stepRange: IRange;
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
    
    