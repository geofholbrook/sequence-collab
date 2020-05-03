

import { getColorFromString } from '../gui/Main/colors';
import { IDrumLane, ILane, IRollLane } from '../@types';
import { drumSynths } from '../sound-generation/synths';
import { makeDefaultLanes } from '@musicenviro/ui-elements';

const defaultStepRange = { min: -3, max: 14 };

export function newLaneForSynth(synthName: string): IDrumLane | IRollLane {
	if (drumSynths.find(synth => synth.name === synthName)) {
		return <IDrumLane>{
			laneType: 'SingleNoteLane',
			synthName,
			loopTimes: [],
			muted: false,
			color: getColorFromString(synthName)
		}
	} else {
		return <IRollLane>{
			laneType: 'DiatonicPianoRoll',
			synthName,
			muted: false,
			stepRange: defaultStepRange,
			zeroPitch: 48,
			mode: 'Dorian',
			rows: makeDefaultLanes(defaultStepRange),
		}
	}
}
