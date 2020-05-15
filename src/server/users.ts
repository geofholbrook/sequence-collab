import fs from 'fs';
import {
	ICreateUserParams,
	ICreateUserResponse,
	ILoginResponse,
	ILoginParams,
	ISignupParams,
	ISignupResponse,
} from '../@types';
import { storageRoot } from './dataPath';
import { createSession, handleLogoffForSession } from './session';
import { maxUsers } from './config';

import Debug from 'debug';
const debug = Debug('sj:server:users');

import { promisify } from 'util';
import { allowDuplicateLogins } from '../config';
import { onlineUsers, sessions } from './storage';
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

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
		if (!allowDuplicateLogins && getLoggedInUsers().includes(params.name)) {
		debug('user already logged in');
		return {
			success: false,
				status: 'LoginRefused',
				message: `${params.name} already logged in elsewhere`,
			};
		}

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
	const newSession = createSession(name);
	sessions[newSession.id] = newSession;

	onlineUsers[name] = {
		name,
		sessionId: newSession.id
	};
	
	debug(`${name} connected`)
	debug('online users:', Object.keys(onlineUsers).length === 0 ? '<none>' : Object.keys(onlineUsers).join())
}

export function doLogoffUser(name: string) {
	if (!onlineUsers[name]) return
	handleLogoffForSession(name, onlineUsers[name].sessionId)
	delete onlineUsers[name]

	debug(`${name} disconnected.`)
	debug('online users:', Object.keys(onlineUsers).length === 0 ? '<none>' : Object.keys(onlineUsers).join())
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
