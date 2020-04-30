import { IScene } from "../@types";
import { doJsonPost, doJsonGet } from "./requests";
import { ISaveSceneResponse, ILoadSceneResponse } from "../@types/api";


export async function saveSceneToServer(user: string, scene: IScene): Promise<ISaveSceneResponse> {
    const res = await doJsonPost('/scene/save', {
        user,
        scene
    })
    return res as ISaveSceneResponse;
}

export async function loadSceneFromServer(user: string, sceneName: string): Promise<ILoadSceneResponse> {
    const res = await doJsonGet('/scene/load', {
        user,
        sceneName
    })
    return res as ILoadSceneResponse
}
