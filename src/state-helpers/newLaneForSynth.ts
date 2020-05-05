

import { getColorFromString } from '../gui/Main/colors';
import { IDrumLane, IRollLane } from '../@types';
import { makeDefaultLanes } from '@musicenviro/ui-elements';

const defaultStepRange = { min: -3, max: 14 };

export function newLaneForSynth(synthName: string): IDrumLane | IRollLane {
	if (!['bass', 'bass2'].includes(synthName)) {
		return <IDrumLane>{
			laneType: 'SingleNoteLane',
			synthName,
			loopTimes: [],
			volumeDb: 0,
			muted: false,
			color: getColorFromString(synthName)
		}
	} else {
		return <IRollLane>{
			laneType: 'DiatonicPianoRoll',
			synthName,
			muted: false,
			volumeDb: 0,
			stepRange: defaultStepRange,
			zeroPitch: 48,
			mode: 'Dorian',
			rows: makeDefaultLanes(defaultStepRange),
		}
	}
}
