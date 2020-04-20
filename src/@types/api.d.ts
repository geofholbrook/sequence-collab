import { IScene } from ".";

export interface ICreateUserParams {
    name: string;
}
export interface ICreateUserResponse {
    success: boolean;
    message: string;
}

export interface ILoginParams {
    name: string;
}
export interface ILoginResponse {
    success: boolean;
    status: 'LoggedIn' | 'UnknownUser' | 'LoginRefused';
    message: string;
}

export interface ISignupParams {
    name: string;
}
export interface ISignupResponse {
    success: boolean;
    status: 'SignedUp' | 'UserExists' | 'SignupRefused';
    message: string;
}

export interface ISaveSceneParams {
    user: string;
    scene: IScene;
}
export interface ISaveSceneResponse {
    success: boolean;
    status: 'Saved' | 'NotSaved';
    message: string;
}

export interface ILoadSceneParams {
    user: string;
    sceneName: string;
}
export interface ILoadSceneResponse {
    success: boolean;
    status: 'Loaded' | 'NotLoaded';
    message: string;
    scene: IScene | null
}