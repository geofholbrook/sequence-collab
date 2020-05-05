import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { currentSceneVersion, IScene, ISavedState } from '../@types';
import { AppStore } from '../redux';
import { initialState } from "../initialState";

export async function saveWorkingScene(store: AppStore) {
	
	const stateToSave: ISavedState = {
		lanes: store.getState().lanes,
	};

	console.log(stateToSave)

	store.dispatch({
		type: 'SET_ROOT_PROPERTY',
		propertyName: 'saveState',
		value: 'WaitingForSave',
	});

	const res = await saveSceneToServer(store.getState().user, {
		version: currentSceneVersion,
		name: 'temp',
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
	const res = await loadSceneFromServer(username, 'temp');

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
