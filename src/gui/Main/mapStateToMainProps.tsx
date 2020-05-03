import { IReduxState } from '../../@types';

export function mapStateToMainProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
		},
		saveState: state.saveState,
		lanes: state.lanes,
		remoteMouse: state.remoteMouse,
	};
}
