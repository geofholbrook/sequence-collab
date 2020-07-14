import { IReduxState } from './@types';
import { tree44 } from '@musicenviro/ui-elements';
import { untitledSceneName } from './config';

export const initialState: IReduxState = {
	user: 'unknown',
	sceneName: untitledSceneName,
	saveState: 'Clean',
	remoteMouse: null,
	masterRhythmTree: tree44,
	masterTempo: 120,
	lanes: [],
};
