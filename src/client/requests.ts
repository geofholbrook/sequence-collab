import superagent from 'superagent';
import { ILoginResponse } from '../@types';

const local = true;
const apiURL = local ? 'http://localhost:4040/api' : 'http://nodedroplet/api';


export async function requestLogin(name: string) {
	return doJsonPost<ILoginResponse>('/login', { name })
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

export async function doGetWithQuery(path: string, query: object) {
	return new Promise((resolve, reject) => {
		superagent
			.get(apiURL + path)
			.query(query)
			.end((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
	});
}
