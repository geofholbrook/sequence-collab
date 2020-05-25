import { ISynthNote, ILane, ISingleNoteLane, IPianoRollLane, AnyLane } from '../@types';
import _ from 'lodash';
import { ILoopNote } from './Scheduler/Scheduler';
import { IRange, DiatonicStep, pitchFromStep } from '@musicenviro/base';

export function getLoopNotesForLane(lane: AnyLane) {
	switch (lane.laneType) {
		case 'SingleNoteLane': {
			const drumLane = lane as ISingleNoteLane;
			return drumLane.notes.map((note) => ({
				data: {
					synthName: lane.synthName,
					args: [lane.volumeDb],
				},
				loopTime: drumLane.treeLoopTimes[note.treePointIndex],
			}));
		}

		case 'PianoRoll': {
			const rollLane = lane as IPianoRollLane;

			return rollLane.notes.map((note) => ({
				data: {
					synthName: lane.synthName,
					args: [getPitch(rollLane.stepRange, note.step!), lane.volumeDb],
				},
				loopTime: lane.treeLoopTimes[note.treePointIndex],
			}));
		}
	}
}

function getPitch(stepRange: IRange<DiatonicStep>, laneIndex: number) {
	const step = stepRange.min + laneIndex;
	return pitchFromStep(step, 36, 'Dorian');
}
