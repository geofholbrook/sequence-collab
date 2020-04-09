import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './App.css';

ReactDOM.render(
	<App />,
	// <div>
	// 	<FacebookLoginButton
	// 		callback={(info: ReactFacebookLoginInfo) => {
	// 			ReactDOM.render(<App userInfo={{name: info.name as string}} />, document.getElementById('root'));
	// 		}}
	// 	/>
	// </div>,
	document.getElementById('root'),
);
