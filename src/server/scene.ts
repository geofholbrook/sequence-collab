import * as fs from 'fs';

import {
	ISaveSceneResponse,
	ILoadSceneResponse,
} from '../@types';

import { IScene } from '../@types';
import { storageRoot } from './dataPath';

import { backwardCompat } from '../compat';

export function getScenePath(user: string, sceneName: string) {
	return `/users/${user}/scenes/${sceneName}`;
}

export async function serveSaveSceneRequest(params: {
	user: string;
	scene: IScene;
	filename: string;
}): Promise<ISaveSceneResponse> {
	const path = getScenePath(params.user, params.filename);

	try {
		await doSaveScene(path, params.scene);
		return {
			success: true,
			status: 'Saved',
			message: `saved scene to ${path}`,
		};
	} catch (e) {
		return {
			success: false,
			status: 'NotSaved',
			message: e.message,
		};
	}
}

export async function doSaveScene(path: string, scene: IScene) {
	return fs.promises.writeFile(storageRoot + path, JSON.stringify(scene, null, 4));
}



export async function serveLoadSceneRequest(params: {
	user: string;
	fileName: string;
}): Promise<ILoadSceneResponse> {
	const path = getScenePath(params.user, params.fileName);
	try {
		const scene = await doLoadScene(path);

		return {
			success: true,
			status: 'Loaded',
			message: `successfuly loaded scene from ${path}`,
			scene,
		};
	} catch (e) {
		return {
			success: false,
			status: 'NotLoaded',
			message: e.message,
		};
	}
}

export async function doLoadScene(path: string) {
	const buffer = await fs.promises.readFile(storageRoot + path);
	const original = JSON.parse(buffer.toString());
	const scene = backwardCompat(original);
	return scene;
}