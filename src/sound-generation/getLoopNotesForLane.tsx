import { ISynthNote, ILane, IDrumLane, IRollLane } from '../@types';
import _ from 'lodash';
import { ILoopNote } from './Scheduler/Scheduler';
import { IRange, DiatonicStep, pitchFromStep } from '@musicenviro/base';

export function getLoopNotesForLane(lane: ILane) {
	switch (lane.laneType) {
		case 'SingleNoteLane': {
			const drumLane = lane as IDrumLane;
			return drumLane.loopTimes.map((loopTime) => ({
				data: {
					synthName: lane.synthName,
					args: [lane.volumeDb],
				},
				loopTime,
			}));
		}

		case 'DiatonicPianoRoll': {
			const rollLane = lane as IRollLane;
			
			return _.concat([], ...rollLane.rows.map((row, ri) => row.cells
				.map((cell, ci) => cell.active && {
					data: {
						synthName: lane.synthName,
						args: [getPitch(rollLane.stepRange, ri), lane.volumeDb],
					},
					loopTime: (ci * 1) / 16,
				})
				.filter(Boolean) as ILoopNote<ISynthNote>[]));
		}
	}
}

function getPitch(stepRange: IRange<DiatonicStep>, laneIndex: number) {
	const step = stepRange.min + laneIndex;
	return pitchFromStep(step, 36, 'Dorian');
}
