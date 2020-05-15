import * as fs from 'fs';
import {v1 as uuid} from 'uuid'

import {
	ISaveSceneParams,
	ISaveSceneResponse,
	ILoadSceneParams,
	ILoadSceneResponse,
	ILane,
} from '../@types';



import { currentSceneVersion, IScene } from '../@types';

import { storageRoot } from './dataPath';

import { promisify } from 'util';

import { initialState } from '../initialState';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

export function getScenePath(user: string, sceneName: string) {
	return `/users/${user}/scenes/${sceneName}.scene`;

}

export async function serveSaveSceneRequest(params: ISaveSceneParams): Promise<ISaveSceneResponse> {
	const path = getScenePath(params.user, params.scene.name);

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
	return writeFile(storageRoot + path, JSON.stringify(scene, null, 4));
}

export async function loadScene(path: string) {
	const buffer = await readFile(storageRoot + path);
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



function backwardCompat(rawScene: any): IScene {
	if (rawScene.version < '0.2.1') {
		return {
			name: rawScene.name,
			version: currentSceneVersion,
			reduxState: {
				lanes: initialState.lanes,
			},
		};
	} else {
		return rawScene

		// return {
		// 	...rawScene,
		// 	lanes: rawScene.lanes.map((lane:any) => !!lane.laneId ? lane : {
		// 		...lane,
		// 		laneId: uuid()
		// 	})
		// }

		// this doesn't work
		// return {
		// 	...rawScene,
		// 	reduxState: {
		// 		...rawScene.reduxState,
		// 		lanes: rawScene.lanes.map((lane: any) => laneBackwardCompat(lane, rawScene.version)),
		// 	},
		// };
	}
}

