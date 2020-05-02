import { IReduxAction } from '../redux';
import { Dispatch } from 'redux';
import { IReduxState } from '../@types';
import { loadSceneFromServer } from '../client/rest/scene';

export function mapStateToGuiProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
		},
	};
}
export function mapDispatchToGuiProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setUser: async (username: string) => {
			dispatch({
				type: 'SET_USER',
				user: username,
			});
			const res = await loadSceneFromServer(username, 'temp');
			if (res.success) {
				const scene = res.scene!;
				dispatch({
					type: 'LOAD_STATE',
					state: scene.reduxState,
				});
			}
		},
	};
}
