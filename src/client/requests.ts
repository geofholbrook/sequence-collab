import superagent from 'superagent';

const local = true;
const apiURL = local ? 'http://localhost:4040/api' : 'http://nodedroplet/api';

export async function doJsonPost(path: string, payload: object): Promise<object> {
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
