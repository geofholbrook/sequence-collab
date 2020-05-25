
import _ from 'lodash'
import { ILane, IDrumLane, IRollLane } from "../@types";
import { IRhythmTree, getRhythmPoints } from "@musicenviro/ui-elements";

export function setLaneTree(_lane: IDrumLane | IRollLane, tree: IRhythmTree): IDrumLane | IRollLane { 
    switch (_lane.laneType) {
        case 'SingleNoteLane': {
            const lane = _lane as IDrumLane
            const prevTreeLoopTimes = lane.treeLoopTimes
            const newTreeLoopTimes = getRhythmPoints(tree).map(p => p.position)

            // find closest loop time in new grid lazy, quite inefficient
            const quantized = newTreeLoopTimes.length === 0 ? [] : lane.notes.map(note => {
                const orig = prevTreeLoopTimes[note.treePointIndex]
                const closestTime = _.minBy(newTreeLoopTimes, t => Math.abs(t - orig))
                const treePointIndex = newTreeLoopTimes.indexOf(closestTime!)

                if (typeof closestTime !== 'number' || treePointIndex === -1) {
                    console.log({newTreeLoopTimes, orig})
                    throw new Error('unexpected problem quantizing')
                }

                return {
                    treePointIndex
                }
            })

            const unique = _.uniqBy(quantized, n => n.treePointIndex)

            return {
                ...lane,
                rhythmTree: tree,
                treeLoopTimes: newTreeLoopTimes,
                notes: unique
            }
        }

        default: 
            return _lane   
    }
}