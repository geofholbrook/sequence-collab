
import { IScene, getStateToSave, ISaveSceneResponse } from '../@types';
import { AppStore } from '../redux';
import { initialState } from "../initialState";
import { currentVersion } from '../compat';
import { workingFileName } from '../config';
import { requestSave, requestLoad } from '../bridge';

export async function saveScene(store: AppStore, filename: string): Promise<ISaveSceneResponse> {
	const stateToSave = getStateToSave(store.getState())

	store.dispatch({
		type: 'SET_ROOT_PROPERTY',
		propertyName: 'saveState',
		value: 'WaitingForSave',
	});

	const res = await requestSave({
		user: store.getState().user,
		scene: {
			version: currentVersion,
			name: stateToSave.sceneName,
			reduxState: stateToSave,
		},
		filename
	})

	if (res.success) {
		store.dispatch({
			type: 'SET_ROOT_PROPERTY',
			propertyName: 'saveState',
			value: store.getState().saveState === 'WaitingForSave' ? 'Clean' : 'Dirty',
		});
	}

	return res
}

export async function loadWorkingScene(store: AppStore) {
	const username = store.getState().user;
	const res = await requestLoad({ user: username, sceneName: workingFileName});

	if (res.success) {
		const scene = res.scene as IScene;

		store.dispatch({
			type: 'LOAD_STATE',
			state: {
				...(scene.reduxState || initialState),
				user: username,
			},
		});
	} else {
		// TODO deal with loading failure.
	}
}
