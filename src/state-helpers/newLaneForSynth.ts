import { v1 as uuid } from 'uuid'

import { getColorFromString } from '../gui/Main/colors';
import { makeDefaultLanes, getRhythmPoints } from '@musicenviro/ui-elements';
import { noteSynthNames } from '../sound-generation/noteSynthNames';
import { tree44 } from '@musicenviro/ui-elements';
import { AnyLane } from '../@types';

const defaultStepRange = { min: -3, max: 14 };

export function newLaneForSynth(synthName: string): AnyLane {
	
	const synthLaneProps = {
		laneId: uuid(),
		synthName,
		volumeDb: 0,
		muted: false,
		rhythmTree: tree44
	}
	
	if (!noteSynthNames.includes(synthName)) {
		return {
			...synthLaneProps,
			laneType: 'SingleNoteLane',
			rhythmTree: tree44,
			treeLoopTimes: getRhythmPoints(tree44).map(p => p.position),
			notes: [],
			color: getColorFromString(synthName)
		}
	} else {
		return {
			...synthLaneProps,
			rhythmTree: tree44,
			treeLoopTimes: getRhythmPoints(tree44).map(p => p.position),
			notes: [],
			color: getColorFromString(synthName),
			laneType: 'PianoRoll',
			stepRange: defaultStepRange,
			zeroPitch: 48,
			mode: 'Dorian',
		}
	}
}
