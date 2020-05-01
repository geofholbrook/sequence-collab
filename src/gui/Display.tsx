import * as React from 'react';
import { MainConnected } from './Main/Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';
import { TestRequests } from './screens/TestScreen';
import { requestLogin } from '../client/rest/requests';

import { local, skipLoginForLocal } from '../config';

import './appearance/Display.css';
import { connect } from 'react-redux';
import { IReduxAction } from '../redux';
import { Dispatch } from 'redux';
import { IReduxState, ILane } from '../@types';
import { loadSceneFromServer } from '../client/rest/scene';
import { IPoint } from '@musicenviro/base';

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
	onMousePositionUpdate: (position: IPoint) => void;

	// dispatch mappings
	setUser: (username: string) => void;
}

export function GUI(props: IAppProps) {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const setUser = props.setUser
	
	React.useEffect(() => {
	
		console.log('GUI MOUNTING')
	
		if (local && skipLoginForLocal && initialScreen === 'Login') {
			
			
			requestLogin('dev').then((res) => {
				if (res.success) {
					setUser('dev');
					setScreen('Main');
				}
			});
		}
	}, [setUser]); 

	
	return (
		<div>
			<div className="logo-header">Telepromptu</div>
			<div className="master-screen-container">{masterScreen()}</div>
		</div>
	);

	function masterScreen() {
		switch (screen) {
			case 'Main':
				return (
					<MainConnected
						onStartAudio={() => props.onStartAudio()}
						onStopAudio={() => props.onStopAudio()}
						onMousePositionUpdate={props.onMousePositionUpdate}
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
