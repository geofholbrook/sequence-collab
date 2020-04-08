import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { FacebookLoginButton } from './users/LoginButton';



let userInfo: {name: string} | null = {
	name: "<login disabled>"
};

ReactDOM.render(
	<App userInfo={{name: userInfo.name as string}} />,
	// <div>
	// 	<FacebookLoginButton
	// 		callback={(info: ReactFacebookLoginInfo) => {
	// 			ReactDOM.render(<App userInfo={{name: info.name as string}} />, document.getElementById('root'));
	// 		}}
	// 	/>
	// </div>,
	document.getElementById('root'),
);
