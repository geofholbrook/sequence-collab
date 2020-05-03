

import { getColorFromString } from '../gui/Main/colors';
import { IDrumLane } from '../@types';

export function newLaneForSynth(synthName: string): IDrumLane {
	return {
		laneType: 'SingleNoteLane',
		synthName,
		loopTimes: [],
		muted: false,
		color: getColorFromString(synthName)
	};
}
