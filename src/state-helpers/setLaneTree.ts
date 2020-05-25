
import _ from 'lodash'
import { IRhythmTree, getRhythmPoints } from "@musicenviro/ui-elements";
import { AnyLane } from '../@types';

export function setLaneTree(lane: AnyLane, tree: IRhythmTree): AnyLane { 
    switch (lane.laneType) {
        case 'SingleNoteLane': 
        case 'PianoRoll': 
        {
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
                    ...note,
                    treePointIndex
                }
            })

            const unique = _.uniqBy(quantized, n => n.treePointIndex * 100 + (n.step || 0))

            return {
                ...lane,
                rhythmTree: tree,
                treeLoopTimes: newTreeLoopTimes,
                notes: unique
            }
        }

        default: 
            return lane   
    }
}