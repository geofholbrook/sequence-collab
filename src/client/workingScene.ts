import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { IScene, getStateToSave } from '../@types';
import { AppStore } from '../redux';
import { initialState } from "../initialState";
import { currentVersion } from '../server/compat';

export async function saveWorkingScene(store: AppStore) {
	const stateToSave = getStateToSave(store.getState())

	store.dispatch({
		type: 'SET_ROOT_PROPERTY',
		propertyName: 'saveState',
		value: 'WaitingForSave',
	});

	const res = await saveSceneToServer(store.getState().user, {
		version: currentVersion,
		name: store.getState().currentSceneName,
		reduxState: stateToSave,
	});

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
	console.log('loadWorkingScene', username)
	const res = await loadSceneFromServer(username, 'Untitled.scene');

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
