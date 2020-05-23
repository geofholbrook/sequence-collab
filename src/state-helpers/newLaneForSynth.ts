import { v1 as uuid } from 'uuid'

import { getColorFromString } from '../gui/Main/colors';
import { IDrumLane, IRollLane } from '../@types';
import { makeDefaultLanes } from '@musicenviro/ui-elements';
import { noteSynthNames } from '../sound-generation/noteSynthNames';
import { tree44 } from '@musicenviro/ui-elements';

const defaultStepRange = { min: -3, max: 14 };

export function newLaneForSynth(synthName: string): IDrumLane | IRollLane {
	
	const synthLaneProps = {
		laneId: uuid(),
		synthName,
		volumeDb: 0,
		muted: false,
		rhythmTree: tree44
	}
	
	if (!noteSynthNames.includes(synthName)) {
		return <IDrumLane>{
			...synthLaneProps,
			laneType: 'SingleNoteLane',
			loopTimes: [],
			color: getColorFromString(synthName)
		}
	} else {
		return <IRollLane>{
			... synthLaneProps,
			laneType: 'DiatonicPianoRoll',
			stepRange: defaultStepRange,
			zeroPitch: 48,
			mode: 'Dorian',
			rows: makeDefaultLanes(defaultStepRange),
		}
	}
}
