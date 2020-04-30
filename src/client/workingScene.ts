import { saveSceneToServer, loadSceneFromServer } from './rest/scene';
import { currentSceneVersion, IScene, ISavedState } from '../@types';
import { AppStore, initialState } from '../redux';

export async function saveWorkingScene(store: AppStore) {
	
	const stateToSave: ISavedState = {
		stepRange: store.getState().stepRange,
		lanes: store.getState().lanes,
		drumLanes: store.getState().drumLanes,
	};

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
