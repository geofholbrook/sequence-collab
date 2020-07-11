import superagent from 'superagent';
import { IRequestInviteLinkResponse, IRequestSessionEntryResponse, IFileListResponse } from "../../@types";
import { local, nodeDropletIP } from '../../config';

const apiURL = local ? 'http://localhost:4040/api' : `https://${nodeDropletIP}/api`;

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
