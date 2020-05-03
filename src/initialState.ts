import { IReduxState } from './@types';
import { newLaneForSynth } from './state-helpers/newLaneForSynth';
import { getColorFromString } from './gui/Main/colors';

// doing this gradually, can move other state in here if it works and we like it.

const synthName = 'kick'

export const initialState: IReduxState = {
	user: 'unknown',
	saveState: 'Clean',
	remoteMouse: null,
	// lanes: makeDefaultLanes(defaultStepRange),
	drumLanes: [
		{
			laneType: 'SingleNoteLane',
			synthName,
			loopTimes: [],
			muted: false,
			color: getColorFromString(synthName)
		},
	],
};
