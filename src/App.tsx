import * as React from 'react';
import { Main } from './Main';
import { Login } from './screens/Login';
import { Test } from './screens/Test';

type Screen = 'Login' | 'Main' | 'Test';

let userInfo: { name: string } = {
	name: '<login disabled>',
};

const initialScreen = 'Main'

export function App() {
	const [screen, setScreen] = React.useState<Screen>(initialScreen);
	const [username, setUserName] = React.useState<string>('<none>')

	switch (screen) {
		case 'Main':
			return <Main userInfo={{ name: username }} />
        
        case 'Login':
            return <Login 
                onSuccess={(uname: string) => {
					setUserName(uname)
					setScreen('Main')}}
            />

		case 'Test':
			return <Test />
	}
}
