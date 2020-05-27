import { IReduxState } from '../../@types';

export function mapStateToMainProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
			currentSceneName: state.currentSceneName
		},
		sessionInfo: state.sessionInfo || null,
		saveState: state.saveState,
		masterRhythmTree: state.masterRhythmTree,
		lanes: state.lanes,
		remoteMouse: state.remoteMouse,
	};
}
