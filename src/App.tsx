import * as React from 'react';
import { Main } from './Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';
import { TestRequests } from './screens/TestScreen';
import { requestLogin } from './rest/requests';

type Screen = 'Login' | 'Main' | 'Test' | 'TestScreen';

const initialScreen: Screen = 'Login';

export function App() {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const [username, setUserName] = React.useState<string>(
		'user' + Math.floor(Math.random() * 10000),
	);

	return (
		<div>
			<div className="logo-header">Telepromptu</div>
			<div className="master-screen-container">{masterScreen()}</div>
		</div>
	);

	function masterScreen() {
		switch (screen) {
			case 'Main':
				return <Main userInfo={{ name: username }} />;
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
