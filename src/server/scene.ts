import * as fs from 'fs';
import { ISaveSceneParams, ISaveSceneResponse, ILoadSceneParams, ILoadSceneResponse } from '../@types';
import { storageRoot } from './dataPath';

export async function saveScene(params: ISaveSceneParams): Promise<ISaveSceneResponse> {
	const path = `/users/${params.user}/scenes/${params.scene.name}.scene`;
	try {
		fs.promises.writeFile(storageRoot + path, JSON.stringify(params.scene, null, 4));
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

export async function loadScene(params: ILoadSceneParams): Promise<ILoadSceneResponse> {
	const path = `/users/${params.user}/scenes/${params.sceneName}.scene`;
	try {
		const buffer = await fs.promises.readFile(storageRoot + path)
		const scene = JSON.parse(buffer.toString())

		return {
			success: true,
			status: 'Loaded',
			message: `successfuly loaded scene from ${path}`,
			scene
		}
	} catch (e) {
		return {
			success: false,
			status: 'NotLoaded',
			message: e.message,
			scene: null
		}
	}
}
