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
import { getColorFromString } from '../gui/Main/colors';

import { initialState } from '../initialState';
import { newLaneForSynth } from '../state-helpers/newLaneForSynth';

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
		const scene = backwardCompat(original);

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

function laneBackwardCompat(rawLane: any, sceneVersion: string): ILane {
	// pretty straight-forward for now.
	return {
		...newLaneForSynth(rawLane.synthName),
		...rawLane,
		color: rawLane.color || getColorFromString(rawLane.synthName),
	};
}
