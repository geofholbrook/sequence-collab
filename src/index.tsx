import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { FacebookLoginButton } from './users/LoginButton';

let userInfo: ReactFacebookLoginInfo | null = null;

ReactDOM.render(
	<div>
		<FacebookLoginButton
			callback={(info: ReactFacebookLoginInfo) => {
				userInfo = info;
				ReactDOM.render(<App userInfo={userInfo} />, document.getElementById('root'));
			}}
		/>
	</div>,
	document.getElementById('root'),
);
