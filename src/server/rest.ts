import fs from 'fs';
import { storageRoot } from './dataPath';
import { createExpressApp } from 'restful-bridge'
import { Express } from "express"
import { bridge } from '../bridge';

const app = createExpressApp() as Express; // need to fix this type in the package

export function initRestApi(): Promise<Express.Application> {
	return new Promise(() => {

		if (!fs.existsSync(storageRoot)) {
			fs.mkdirSync(storageRoot);
			console.log(storageRoot + ' created √');
			fs.mkdirSync(storageRoot + '/users');
			console.log(storageRoot + '/users created √');
		} else {
			// console.log(dataPath + ' exists √');
		}

		bridge.getServerInitializer()(app);
	});
}
