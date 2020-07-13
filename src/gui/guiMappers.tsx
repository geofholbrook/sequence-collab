import { IReduxAction } from '../redux';
import { Dispatch } from 'redux';
import { IReduxState } from '../@types';
import { workingFileName } from '../config';
import { requestLoad } from '../bridge';

export function mapStateToGuiProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
		},
		remoteMouse: state.remoteMouse
	};
}

export function mapDispatchToGuiProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setUser: async (username: string) => {
			dispatch({
				type: 'SET_USER',
				user: username,
			});
			const res = await requestLoad({user: username, fileName: workingFileName});
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
