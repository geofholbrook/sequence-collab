import { IReduxState } from './@types';
import { tree44 } from '@musicenviro/ui-elements';

export const initialState: IReduxState = {
	user: 'unknown',
	sceneName: 'Untitled',
	saveState: 'Clean',
	remoteMouse: null,
	masterRhythmTree: tree44,
	masterTempo: 120,
	lanes: [],
};
