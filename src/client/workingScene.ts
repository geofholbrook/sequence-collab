import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { IScene, getStateToSave } from '../@types';
import { AppStore } from '../redux';
import { initialState } from "../initialState";
import { currentVersion } from '../server/compat';
import { workingFileName } from '../config';

export async function saveScene(store: AppStore, filename: string) {
	const stateToSave = getStateToSave(store.getState())

	store.dispatch({
		type: 'SET_ROOT_PROPERTY',
		propertyName: 'saveState',
		value: 'WaitingForSave',
	});

	const res = await saveSceneToServer({
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
}

export async function loadWorkingScene(store: AppStore) {
	const username = store.getState().user;
	const res = await loadSceneFromServer(username, workingFileName);

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
