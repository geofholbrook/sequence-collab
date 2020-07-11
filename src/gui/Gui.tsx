import * as React from 'react';
import { MainConnected } from './Main/Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';
import { TestRequests } from './screens/TestScreen';
import { requestLogin } from '../bridge';

import { local, skipLoginForLocal } from '../config';

import './appearance/Display.css';
import { connect } from 'react-redux';
import { IPoint } from '@musicenviro/base';
import { mapStateToGuiProps, mapDispatchToGuiProps } from './guiMappers';
import { fetchOnlineUsers } from '../bridge';


window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

type Screen = 'Login' | 'Main' | 'Test' | 'TestScreen';

const initialScreen: Screen = 'Login';

export const GUIConnected = connect(mapStateToGuiProps, mapDispatchToGuiProps)(GUI);

interface IGuiProps {
	userInfo: { name: string };
	inviteSessionId: string | null;

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;
	onMousePositionUpdate: (position: IPoint) => void;
	onLogin: (username: string) => Promise<boolean>;
	onSaveAs: (filename: string) => void;

	// dispatch mappings
	setUser: (username: string) => void;
}

export function GUI(props: IGuiProps) {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const setUser = props.setUser
	const onLogin = props.onLogin

	React.useEffect(() => {
		console.log('GUI MOUNTING');

		if (local && skipLoginForLocal && initialScreen === 'Login') {
			(async () => {
				const onlineUsers = await fetchOnlineUsers()
				const devUsername = onlineUsers.includes('dev') ? 'dev2' : 'dev'

				const res = await requestLogin({name: devUsername});

				if (res.success) {
					setUser(devUsername);
					onLogin(devUsername).then()
					setScreen('Main');
				}
			})();
		}
	}, [setUser, onLogin]);

	return (
		<div>
			<div className="logo-header">jammr.io</div>
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
						onSaveAs={props.onSaveAs}
					/>
				);

			case 'Login':
				return (
					<Login
						onLogin={async (uname: string) => {
							// props.setUser(uname);
							await props.onLogin(uname);
							setScreen('Main');
						}}
						onSignup={async (uname: string) => {
							// props.setUser(uname);
							await props.onLogin(uname);
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
