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

type Screen = 'Login' | 'Main' | 'Test' | 'TestScreen';

const initialScreen: Screen = 'Login';

export function App() {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const [username, setUserName] = React.useState<string>(
		'user' + Math.floor(Math.random() * 10000),
	);

	React.useEffect(() => {
		if (local && skipLoginForLocal && initialScreen === 'Login') {
			requestLogin('dev').then(res => {
				if (res.success) {
					setUserName('dev')
					setScreen('Main')
				}
			})
		}
	}, [])

	const MainContainer = connect(null, mapDispatchToMainProps)(Main)
	
	return (
		<div>
			<div className="logo-header">Telepromptu</div>
			<div className="master-screen-container">{masterScreen()}</div>
		</div>
	);

	// ----------------------------------------------------------------------------
	// function-scope helpers
	// ----------------------------------------------------------------------------

	function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
		return {
			setUser: (name: string) => dispatch({
				type: 'SET_USER',
				user: name
			}),

			setCell: (laneIndex: number, cellIndex: number, active: boolean) => dispatch({
				type: 'SET_CELL',
				broadcast: true,
				laneIndex,
				cellIndex,
				active
			})
		}
	}

	
	function masterScreen() {
		
		switch (screen) {
			case 'Main':
				return <MainContainer userInfo={{ name: username }} />;
			case 'Login':
				return (
					<Login
						onLogin={async (uname: string) => {
							setUserName(uname);
							setScreen('Main');
						}}

						onSignup={async (uname: string) => {
							setUserName(uname);
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
