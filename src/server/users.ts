import fs from 'fs';
import { IOnlineUser } from '../@types';
import {
	ICreateUserParams,
	ICreateUserResponse,
	ILoginResponse,
	ILoginParams,
	ISignupParams,
	ISignupResponse,
} from '../@types';
import { storageRoot } from './dataPath';
import { createSession } from './session';
import { maxUsers } from './config';

import Debug from 'debug';
const debug = Debug('sj:server:users');

import { promisify } from 'util';
import { allowDuplicateLogins } from '../config';
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

export const onlineUsers: { [index: string]: IOnlineUser } = {};

/**
 * all existing users.
 */
export function getUsersSync() {
	return fs.readdirSync(storageRoot + '/users');
}

export async function getUsers() {
	const dir = await readdir(storageRoot + '/users');
	return dir;
}

export function getLoggedInUsers() {
	return Object.keys(onlineUsers);
}

export async function loginUser(params: ILoginParams): Promise<ILoginResponse> {
	const users = await getUsers();

	if (users.includes(params.name)) {
		debug('user found.');

		if (!allowDuplicateLogins && getLoggedInUsers().includes(params.name)) {
			debug('user already logged in');
			return {
				success: false,
				status: 'LoginRefused',
				message: `${params.name} already logged in elsewhere`,
			};
		}

		debug('logged in.')

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
			message: `user with name ${params.name} already exists`,
		};
	}

	await doSignup(params);
	return {
		success: true,
		status: 'SignedUp',
		message: `${params.name} successfully signed up`,
	};
}

async function doSignup(params: ISignupParams) {
	await mkdir(storageRoot + '/users/' + params.name);
	await mkdir(storageRoot + '/users/' + params.name + '/scenes');
}
