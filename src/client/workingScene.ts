import { saveSceneToServer, loadSceneFromServer } from '../rest/scene';
import { currentSceneVersion, IScene } from '../@types';
import { AppStore, initialState } from '../redux';

export async function saveWorkingScene(store: AppStore) {
	const res = await saveSceneToServer(store.getState().user, {
		version: currentSceneVersion,
		name: 'temp',
		reduxState: store.getState(),
	});

	// if (res.success) {
	// 	this.setState((prev) =>
	// 		prev.saveState === 'WaitingForSave'
	// 			? {
	// 					saveState: 'Clean',
	// 			  }
	// 			: { saveState: 'Dirty' },
	// 	);
	// }
}

export async function loadWorkingScene(store: AppStore) {
	const username = store.getState().user;
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
