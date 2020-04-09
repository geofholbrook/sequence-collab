import * as React from 'react';
import './Login.css';

export function Login(props: { onSuccess: (username: string, password: string) => void }) {
	let username = '';
	let password = '';

	const [usernameRequired, setUsernameRequired] = React.useState<boolean>(false);

	function handleSubmit(event: React.FormEvent) {
		const trimmed = username.trimEnd().trimStart();
		if (trimmed === '') {
			console.log('alsdkfj');
			setUsernameRequired(true);
		} else {
			props.onSuccess(username, password);
		}
	}

	function handleUsernameChange(event: React.FormEvent) {
		username = (event.target as HTMLInputElement).value;
	}

	function handlePasswordChange(event: React.FormEvent) {
		password = (event.target as HTMLInputElement).value;
	}

	return (
		<div className="Screen LoginScreen">
			<header>login screen</header>
			<div id="main">
				<div className="not-actually-a-form">
					<div className="input-container">
						<label htmlFor="username">
							<b>Username</b>
						</label>
						<input
							type="text"
							placeholder="Enter Username"
							name="username"
							onChange={handleUsernameChange}
						/>
						{usernameRequired && <div className="required">required</div>}
					</div>
					<div className="input-container">
						<label htmlFor="password">
							<i>Password (not implemented)</i>
						</label>
						<input
							type="password"
							name="password"
							disabled={true}
							onChange={handlePasswordChange}
						/>
					</div>
					<button onClick={handleSubmit}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
