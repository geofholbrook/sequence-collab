import { ISavedState_0_3_1, IRollLane } from "../@types/compat/savedState_0_3_1"
import { IScene, getStateToSave, IReduxState, ISingleNoteLane, PropTime } from "../@types";
import { initialState } from "../initialState";
import { tree44, getRhythmPoints, INote, ILaneData } from "@musicenviro/ui-elements";
import { getColorFromString } from "../gui/Main/colors";
import { ISavedState_0_4_0 } from "../@types/compat/savedState_0_4_0";

export const currentVersion = '0.4.1'

const versionHistory = [
    {
        version: "0.4.0",
        date: "2020/05/25",
    },
    {
        version: "0.3.1",
        date: "2020/05/24"
    }
]

export function backwardCompat(rawScene: any): IScene {
    if (rawScene.version < '0.2.1') {
        // fuck it, it's trash.
        return {
			name: rawScene.name,
            version: currentVersion,
			reduxState: getStateToSave(initialState),
		};
	} 
    
    if (rawScene.version < '0.3.1') {

        // if the scene is older than 0.3.1, use the old backwardCompat function
        // we hadn't done serial single-version bumping yet
        return backwardCompat(convertTo_0_3_1(rawScene))
    }

    switch (rawScene.version) {
        case "0.3.1": return backwardCompat(convertTo_0_4_0(rawScene as IScene<ISavedState_0_3_1>))
        case "0.4.0": return backwardCompat(convertTo_0_4_1(rawScene as IScene<ISavedState_0_4_0>))
        case "0.4.1": return rawScene as IScene;
        default: throw new Error("can't handle this version")
    }
}

function convertTo_0_4_1(rawScene: IScene<ISavedState_0_4_0>): IScene {
    return {
        name: rawScene.name,
        version: '0.4.1',
        reduxState: {
            ...rawScene.reduxState,
            sceneName: rawScene.name
        }
    }
}

function convertTo_0_4_0(rawScene: IScene<ISavedState_0_3_1>): IScene<ISavedState_0_4_0> {
    const reduxState = rawScene.reduxState
    
    return {
        name: rawScene.name,
        version: '0.4.0',
        reduxState: {
            masterRhythmTree: reduxState.masterRhythmTree,
            masterTempo: reduxState.masterTempo,
            lanes: reduxState.lanes.map(lane => {
                if (lane.laneType === 'SingleNoteLane') {
                    return lane
                }

                const rollLane = lane as IRollLane;

                return {
                    // changed
                    laneType: 'PianoRoll',
                    notes: convertRowsToNotes(rollLane.rows),
                    rhythmTree: tree44,
                    treeLoopTimes: getRhythmPoints(tree44).map(p => p.position),
                    color: getColorFromString(rollLane.synthName),
                    
                    // unchanged
                    laneId: rollLane.laneId,
                    synthName: rollLane.synthName,
                    stepRange: rollLane.stepRange,
                    zeroPitch: rollLane.zeroPitch,
                    mode: rollLane.mode,
                    volumeDb: rollLane.volumeDb,
                    muted: rollLane.muted,
                }
            })
        }
    }

    function convertRowsToNotes(rows: ILaneData[]): INote[] {
        const result: INote[] = []
        
        rows.forEach((row, ri) => row.cells.forEach((cell, ci) => {
            if (cell.active) {
                result.push({
                    treePointIndex: ci,
                    step: ri
                })
            }
        }))

        return result
    }
}


function convertTo_0_3_1(rawScene: any): IScene<ISavedState_0_3_1> {

    if (rawScene.version < '0.3') {
		return {
			...rawScene,
			reduxState: {
				...getStateToSave(initialState),
				...rawScene.reduxState,
				lanes: (rawScene.reduxState as IReduxState).lanes.map(lane => {
					const drumLane = lane as ISingleNoteLane & { loopTimes: PropTime[] }
					if (lane.laneType === 'SingleNoteLane') {
						// convert from an assumed-4/4 16th note grid with prop times
						const result: ISingleNoteLane = {
							// rhythmTree: tree44,
							...lane,
							treeLoopTimes: getRhythmPoints(tree44).map(p => p.position),
							notes: drumLane.loopTimes.map(time => ({
								treePointIndex: time * 16
							}))
						}
						return result
					} else {
						return lane
					}
				})
			},
			version: "0.3.1",
		}
	} else {
		return {
			...rawScene,
			reduxState: {
				...getStateToSave(initialState),
				...rawScene.reduxState,
				// masterRhythmTree: initialState.masterRhythmTree,
			},
			version: "0.3.1",
		}

	}
}