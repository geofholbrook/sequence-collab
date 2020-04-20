import * as React from 'react';
import './Login.css';
import { requestLogin, requestSignup } from '../client/requests';

export function Login(props: { 
	onLogin: (username: string, password: string) => void;
	onSignup: (username: string, password: string) => void;
 }) {
	let password = '';

	const [username, setUsername] = React.useState<string>("")
	const [usernameRequired, setUsernameRequired] = React.useState<boolean>(false);
	const [unknownUser, setUnknownUser] = React.useState<boolean>(false);
	const [userExists, setUserExists] = React.useState<boolean>(false);

	function resetAlerts() {
		setUsernameRequired(false);
		setUnknownUser(false);
		setUserExists(false);
	}

	async function handleLoginButton(event: React.MouseEvent) {
		resetAlerts()
		if (username === '') {
			setUsernameRequired(true);
		} else {
			const res = await requestLogin(username);
			if (res.success) {
				props.onLogin(username, password);
			} else {
				setUnknownUser(true);
			}
		}
	}

	async function handleSignupButton(event: React.MouseEvent) {
		resetAlerts()
		if (username === '') {
			setUsernameRequired(true);
		} else {
			setUsernameRequired(false);
			const res = await requestSignup(username);
			if (res.success) {
				props.onSignup(username, password)
			} else {
				switch (res.status) {
					case "UserExists": 
						setUserExists(true);
				}
			}

		}
	}

	function handleUsernameChange(event: React.FormEvent) {
		resetAlerts()
		setUsername((event.target as HTMLInputElement).value.trimEnd().trimStart());
	}

	function handlePasswordChange(event: React.FormEvent) {
		password = (event.target as HTMLInputElement).value;
	}

	return (
		<div className="Screen LoginScreen">
			<header>LOGIN</header>
			<div className="content">
				<div className="not-actually-a-form">
					<div className="input-container">
						<label htmlFor="username">
							<b>Username</b>
						</label>
						<input
							type="text"
							placeholder="enter username"
							name="username"
							onChange={handleUsernameChange}
						/>
						{usernameRequired && <div className="error">required</div>}
					</div>
					<div className="input-container">
						<label htmlFor="password">
							<i>Password (not implemented*)</i>
						</label>
						<input
							type="password"
							name="password"
							disabled={true}
							onChange={handlePasswordChange}
						/>
					</div>

					<button className="login-button" onClick={handleLoginButton}>
						Log in
					</button>
					{unknownUser && <div className="error">unknown user</div>}
					
					<button className="signup-button" onClick={handleSignupButton}>
						Sign up
					</button>
					{userExists && <div className="error">user already exists</div>}

					<p>
						*User passwords are not implemented for this website, because it's in
						development and we don't have the resources to do this securely. At present
						no sensitive information can be uploaded to the server (just stored musical
						information). But users are prone to using the same password for everything,
						and I wouldn't want a person to give us his or her banking password, for
						example ... wouldn't be safe!
					</p>
				</div>
			</div>
		</div>
	);
}
