import fs from 'fs';
import {
	IOnlineUser,
} from '../@types';
import { ICreateUserParams, ICreateUserResponse, ILoginResponse, ILoginParams, ISignupParams, ISignupResponse } from "../@types";
import { storageRoot } from './dataPath';
import { createSession } from './session';
import { maxUsers } from './config';

import Debug from 'debug'
const debug = Debug('sj:server:users')

export const onlineUsers: { [index: string]: IOnlineUser } = {};

/**
 * all existing users.
 */
export function getUsersSync() {
	return fs
		.readdirSync(storageRoot + '/users', { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

export async function getUsers() {
	const dir = await fs.promises.readdir(storageRoot + '/users', { withFileTypes: true });
	return dir.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
}

export async function loginUser(params: ILoginParams): Promise<ILoginResponse> {
	const users = await getUsers();
	if (users.includes(params.name)) {
		debug('user found. logging in')
		doLoginUser(params.name);
		return {
			success: true,
			status: 'LoggedIn',
			message: `${params.name} successfully logged in`,
		};
	}

	return {
		success: false,
		status: 'UnknownUser',
		message: `no user named ${params.name}`,
	};
}

function doLoginUser(name: string) {
	onlineUsers[name] = {
		name,
		session: createSession(name),
	};
	// console.log(onlineUsers);
}

export async function signupUser(params: ISignupParams): Promise<ISignupResponse> {
	const users = await getUsers();
	if (users.length >= maxUsers) {
		return {
			success: false,
			status: 'SignupRefused',
			message: 'Maximum number of users has been reached.',
		};
	}

	if (users.includes(params.name)) {
		return {
			success: false,
			status: 'UserExists',
			message: `user with name ${params.name} already exists`
		};
	}

	await doSignup(params)
	return {
		success: true,
		status: 'SignedUp',
		message: `${params.name} successfully signed up`
	}
}

async function doSignup(params: ISignupParams) {
	await fs.promises.mkdir(storageRoot + '/users/' + params.name)
	await fs.promises.mkdir(storageRoot + '/users/' + params.name + '/scenes')
}
