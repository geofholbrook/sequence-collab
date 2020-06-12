import { IScene } from "../../@types";
import { doJsonPost, doJsonGet } from "./requests";
import { ISaveSceneResponse, ILoadSceneResponse, ISaveSceneParams } from "../../@types/api";


export async function saveSceneToServer(params: ISaveSceneParams): Promise<ISaveSceneResponse> {
    const res = await doJsonPost('/scene/save', params)
    return res as ISaveSceneResponse;
}

export async function loadSceneFromServer(user: string, sceneName: string): Promise<ILoadSceneResponse> {
    const res = await doJsonGet('/scene/load', {
        user,
        sceneName
    })
    return res as ILoadSceneResponse
}
