import { IReduxState } from '../../@types';

export function mapStateToMainProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
		},
		saveState: state.saveState,
		drumLanes: state.drumLanes,
		lanes: state.lanes,
		stepRange: state.stepRange,
		remoteMouse: state.remoteMouse,
	};
}
