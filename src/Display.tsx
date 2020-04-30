import * as React from 'react';
import { Main } from './Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';
import { TestRequests } from './screens/TestScreen';
import { requestLogin } from './rest/requests';

import { local, skipLoginForLocal } from './config';

import './App.css';
import { connect } from 'react-redux';
import { IReduxAction } from './redux';
import { Dispatch } from 'redux';
import { IReduxState, ILane } from './@types';
import { loadSceneFromServer } from './rest/scene';

type Screen = 'Login' | 'Main' | 'Test' | 'TestScreen';

const initialScreen: Screen = 'Login';

export const GUIConnected = connect(mapStateToAppProps, mapDispatchToAppProps)(GUI);

function mapStateToAppProps(state: IReduxState) {
	return {
		userInfo: {
			name: state.user,
		},
	};
}

function mapDispatchToAppProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setUser: async (username: string) => {
			dispatch({
				type: 'SET_USER',
				user: username,
			})

			const res = await loadSceneFromServer(username, 'temp')
			if (res.success) {
				const scene = res.scene!
				dispatch({
					type: 'LOAD_STATE',
					state: scene.reduxState
				})
			}
		}
	};
}

interface IAppProps {
	userInfo: { name: string };

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;

	// dispatch mappings
	setUser: (username: string) => void;
}

export function GUI(props: IAppProps) {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const setUser = props.setUser
	React.useEffect(() => {
		if (local && skipLoginForLocal && initialScreen === 'Login') {
			requestLogin('dev').then((res) => {
				if (res.success) {
					setUser('dev');
					setScreen('Main');
				}
			});
		}
	}, [setUser]); 

	const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);

	return (
		<div>
			<div className="logo-header">Telepromptu</div>
			<div className="master-screen-container">{masterScreen()}</div>
		</div>
	);

	// ----------------------------------------------------------------------------
	// function-scope helpers
	// ----------------------------------------------------------------------------

	function mapStateToMainProps(state: IReduxState) {
		return {
			userInfo: {
				name: state.user,
			},
			drumLanes: state.drumLanes,
			lanes: state.lanes,
			stepRange: state.stepRange,
			saveState: state.saveState,
			remoteMouse: state.remoteMouse
		};
	}

	function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
		return {
			setCell: (laneIndex: number, cellIndex: number, active: boolean) =>
				dispatch({
					type: 'SET_CELL',
					broadcast: true,
					laneIndex,
					cellIndex,
					active,
				}),

			setDrumLanes: (drumLanes: ILane[]) =>
				dispatch({
					type: 'SET_DRUM_LANES',
					broadcast: true,
					drumLanes,
				}),

			addLane: (lane: ILane) =>
				dispatch({
					type: 'ADD_LANE',
					broadcast: true,
					lane,
				}),

			deleteLane: (index: number) =>
				dispatch({
					type: 'DELETE_LANE',
					broadcast: true,
					index,
				}),

			setLaneProperty: (
				laneIndex: number,
				property: 'synthName' | 'loopTimes' | 'muted',
				value: any,
			) =>
				dispatch({
					type: 'SET_LANE_PROPERTY',
					broadcast: true,
					laneIndex,
					property,
					value,
				}),
		};
	}

	function masterScreen() {
		switch (screen) {
			case 'Main':
				return (
					<MainConnected
						onStartAudio={() => props.onStartAudio()}
						onStopAudio={() => props.onStopAudio()}
					/>
				);

			case 'Login':
				return (
					<Login
						onLogin={async (uname: string) => {
							props.setUser(uname);
							setScreen('Main');
						}}
						onSignup={async (uname: string) => {
							props.setUser(uname);
							setScreen('Main');
						}}
					/>
				);

			case 'Test':
				return <Test />;

			case 'TestScreen':
				return <TestRequests />;
		}
	}
}
