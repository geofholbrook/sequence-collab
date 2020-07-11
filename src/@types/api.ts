import { IScene } from './state';
import { IFileDescription } from '.';

export interface IStatusResponse<T> {
	success: boolean;
	message: string;
	status: T;
}

export type IFetchResponse<T, U> = IStatusResponse<T> & Partial<U>;

export type ILoginResponse = IStatusResponse<'LoggedIn' | 'UnknownUser' | 'LoginRefused'>;
export type ISignupResponse = IStatusResponse<'SignedUp' | 'UserExists' | 'SignupRefused'>;

export interface ISaveSceneParams {
	user: string;
	scene: IScene;
	filename: string;
}
export type ISaveSceneResponse = IStatusResponse<'Saved' | 'NotSaved'>;

export interface ILoadSceneParams {
	user: string;
	sceneName: string;
}

export type ILoadSceneResponse = IFetchResponse<
	'Loaded' | 'NotLoaded',
	{
		scene: IScene;
	}
>;

export interface IRequestInviteLinkParams {
	hostUsername: string;
}

export type IRequestInviteLinkResponse = IFetchResponse<
	'ValidLink' | 'NoLinkGenerated',
	{
		link: string;
	}
>;

export interface IRequestSessionEntryParams {
	guest: string;
	sessionId: string;
}

export interface IRequestSessionEntryResponse {
	success: boolean;
	message: string;
	scene?: IScene;
}

export interface IFileListQuery {
	username: string;
}

export interface IFileListResponse {
	success: boolean;
	message: string;
	fileList?: IFileDescription[];
}
