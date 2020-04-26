

import { getColorFromString } from '../appearance/colors';
import { ILane } from '../@types';

export function newLaneForSynth(synthName: string): ILane {
	return {
		synthName,
		loopTimes: [],
		muted: false,
		color: getColorFromString(synthName)
	};
}
