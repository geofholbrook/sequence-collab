import superagent from 'superagent';
import { ILoginResponse, ISignupResponse, IRequestInviteLinkResponse, IRequestSessionEntryResponse, IFileListResponse } from "../../@types";
import { local, nodeDropletIP } from '../../config';

const apiURL = local ? 'http://localhost:4040/api' : `https://${nodeDropletIP}/api`;

export async function requestLogin(name: string) {
	return doJsonPost<ILoginResponse>('/login', { name })
}

export async function requestSignup(name: string) {
	return doJsonPost<ISignupResponse>('/signup', { name })
}

export  function requestOnlineusers(): Promise<string[]> {
	return doJsonGet<string[]>('/users/online')
}

export function requestFileListForUser(username: string): Promise<IFileListResponse> {
	return doJsonGet<IFileListResponse>('/scene/ls', {username})
}


export async function requestInviteLink(hostUsername: string): Promise<IRequestInviteLinkResponse> {
	const res = await doJsonGet('/request-invite-link', { hostUsername })
	return res as IRequestInviteLinkResponse
}

export async function requestSessionEntry(guest: string, sessionId: string): Promise<IRequestSessionEntryResponse> {
	const res = await doJsonPost('/request-session-entry', { guest, sessionId })
	return res as IRequestSessionEntryResponse
}

export async function doJsonPost<T>(path: string, payload: object): Promise<T> {
	return new Promise((resolve, reject) => {
		superagent
			.post(apiURL + path)
			.send(payload)
			.set('accept', 'json')
			.end((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(res.text));
				}
			});
	});
}

export async function doJsonGet<T>(path: string, query: object = {}): Promise<T> {
	return new Promise((resolve, reject) => {
		superagent
			.get(apiURL + path)
			.query(query)
			.end((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(res.text));
				}
			});
	});
}
