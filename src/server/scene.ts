import * as fs from 'fs';

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
import { getColorFromString } from '../appearance/colors';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

export async function saveScene(params: ISaveSceneParams): Promise<ISaveSceneResponse> {
	const path = `/users/${params.user}/scenes/${params.scene.name}.scene`;
	try {
		writeFile(storageRoot + path, JSON.stringify(params.scene, null, 4));
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
		const buffer = await readFile(storageRoot + path);
		const original = JSON.parse(buffer.toString());

		console.log(original);

		const scene = backwardCompat(original);

		console.log('=====')
		console.log(scene)

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
	const drumLanes =
		(rawScene.reduxState && rawScene.reduxState.drumLanes) ||
		rawScene.drumLanes ||
		rawScene.lanes; // for version <= 0.0.2

	return {
		...rawScene,
		version: currentSceneVersion,
		reduxState: {
			...rawScene.reduxState,
			drumLanes: drumLanes.map((lane: any) => laneBackwardCompat(lane, rawScene.version)),
		}
	};
}

function laneBackwardCompat(rawLane: any, sceneVersion: string): ILane {
	// pretty straight-forward for now.
	return {
		...rawLane,
		color: rawLane.color || getColorFromString(rawLane.synthName),
	};
}
