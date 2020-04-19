import * as React from 'react';
import { Main } from './Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';
import { TestRequests } from './screens/TestScreen';
import { doJsonPost, requestLogin } from './client/requests';

type Screen = 'Login' | 'Main' | 'Test' | 'TestScreen';

const initialScreen: Screen = 'TestScreen'

export function App() {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const [username, setUserName] = React.useState<string>('user' + Math.floor(Math.random() * 10000))

	switch (screen) {
		case 'Main':
			return <Main userInfo={{ name: username }} />
        
        case 'Login':
            return <Login 
                onSuccess={async (uname: string) => {
					const loginResponse = requestLogin(uname)
					setUserName(uname)
					setScreen('Main')}}
            />

		case 'Test':
			return <Test />;

		case 'TestScreen':
			return <TestRequests />;
	}
}
