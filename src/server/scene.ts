import * as fs from 'fs';

import {
	ISaveSceneParams,
	ISaveSceneResponse,
	ILoadSceneParams,
	ILoadSceneResponse,
} from '../@types';

import { IScene } from '../@types';
import { storageRoot } from './dataPath';

import { backwardCompat } from './compat';

import { promisify } from 'util';
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

export function getScenePath(user: string, sceneName: string) {
	return `/users/${user}/scenes/${sceneName}`;
}

export async function serveSaveSceneRequest(params: ISaveSceneParams): Promise<ISaveSceneResponse> {
	const path = getScenePath(params.user, params.filename);

	try {
		await saveScene(path, params.scene);
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

export async function saveScene(path: string, scene: IScene) {
	return fs.promises.writeFile(storageRoot + path, JSON.stringify(scene, null, 4));
}

export async function loadScene(path: string) {
	const buffer = await fs.promises.readFile(storageRoot + path);
	const original = JSON.parse(buffer.toString());
	const scene = backwardCompat(original);

	return scene;
}

export async function serveLoadSceneRequest(params: ILoadSceneParams): Promise<ILoadSceneResponse> {
	const path = getScenePath(params.user, params.sceneName);
	try {
		const scene = await loadScene(path);

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
			scene: null,
		};
	}
}
