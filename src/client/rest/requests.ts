import superagent from 'superagent';
import { ILoginResponse, ISignupResponse } from "../../@types";
import { local, nodeDropletIP } from '../../config';

const apiURL = local ? 'http://localhost:4040/api' : `http://${nodeDropletIP}/api`;

export async function requestLogin(name: string) {
	return doJsonPost<ILoginResponse>('/login', { name })
}

export async function requestSignup(name: string) {
	return doJsonPost<ISignupResponse>('/signup', { name })
}

export async function requestOnlineusers(): Promise<string[]> {
	const res = await doJsonGet('/users/online')
	return res as string[]
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

export async function doJsonGet(path: string, query: object = {}) {
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
