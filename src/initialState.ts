import { IReduxState } from './@types';

// doing this gradually, can move other state in here if it works and we like it.

const synthName = 'kick'

export const initialState: IReduxState = {
	user: 'unknown',
	saveState: 'Clean',
	remoteMouse: null,
	lanes: [
	],
};
