import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { getUsersSync, loginUser, signupUser } from './users';
import { storageRoot } from './dataPath';
import { ILoginParams } from "../@types";

import Debug from 'debug'
import { saveScene, loadScene } from './scene';
const debug = Debug('sj:server:rest')

const app = express();

export function initRestApi(): Promise<Express.Application> {
	return new Promise((resolve) => {
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(cors());

		if (!fs.existsSync(storageRoot)) {
			fs.mkdirSync(storageRoot);
			console.log(storageRoot + ' created √');
			fs.mkdirSync(storageRoot + '/users');
			console.log(storageRoot + '/users created √');
		} else {
			// console.log(dataPath + ' exists √');
		}

		app.get('/api/users', (req, res) => {
			debug(req.hostname, 'requested', req.url);
			res.send(JSON.stringify(getUsersSync()));
			res.end();
		});

		app.post('/api/login', async (req, res) => {
			const params = req.body as ILoginParams;
			debug(req.url, JSON.stringify(params));
			const response = await loginUser(params);
			res.end(JSON.stringify(response));
		});

		
		createPostRoute('/api/signup', signupUser);

		createPostRoute('/api/scene/save', saveScene);
		createGetRoute('/api/scene/load', loadScene);

		// ---------------------------------------------------------------------------
		// route helpers
		// ---------------------------------------------------------------------------

		function createGetRoute(url: string, getter: (params: any) => Promise<any>) {
			app.get(url, async (req, res) => {
				debug(req.hostname, 'GET', req.url);
				const response = await getter(req.query)
				res.end(JSON.stringify(response))
				// res.end()
			}) 
		}

		function createPostRoute(url: string, handler: (params: any) => Promise<any>) {
			app.post(url, async (req, res) => {
				debug(req.hostname, 'POST', req.url)
				const response = await handler(req.body);
				res.end(JSON.stringify(response));
			});
		}

		app.listen(4040, () => {
			debug(`REST server listening on port 4040`)
			resolve(app)
		})
	});
}