import * as React from 'react';
import { Main } from './Main';
import { Login } from './screens/Login';

type Screen = 'Login' | 'Main';

let userInfo: { name: string } | null = {
	name: '<login disabled>',
};

export function App() {
	const [screen, setScreen] = React.useState<Screen>('Login');
	const [username, setUserName] = React.useState<string>('')

	switch (screen) {
		case 'Main':
			return !!userInfo ? (
				<Main userInfo={{ name: username }} />
			) : (
				<div>missing user info</div>
            );
        
        case 'Login':
            return <Login 
                onSuccess={(uname: string) => {
					setUserName(uname)
					setScreen('Main')}}
            />
	}
}
