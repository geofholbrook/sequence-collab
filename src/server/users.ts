import fs from 'fs';
import {
	ILoginResponse,
	ISignupResponse,
	IFileListResponse,
	IFileDescription,
	IStatusResponse,
} from '../@types';
import { storageRoot } from './dataPath';
import { createSession, handleLogoffForSession } from './session';
import { maxUsers } from './config';

import Debug from 'debug';

import { promisify } from 'util';
import { allowDuplicateLogins, workingFileName } from '../config';
import { onlineUsers, sessions } from './storage';

import util from 'util';
import * as cp from 'child_process';

const exec = util.promisify(cp.exec);
const debug = Debug('sj:server:users');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

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

export async function getFileListForUser(params: { username: string }): Promise<IFileListResponse> {
	try {
		const path = storageRoot + '/users/' + params.username + '/scenes';
		const dir = await readdir(path);

		const descriptions: IFileDescription[] = [];

		while (dir.length > 0) {
			const filename = dir.pop();
			if (filename === workingFileName) {
				continue;
			}

			const filepath = path + '/' + filename;
			const stats = await stat(filepath);

			// first line that contains the word "version" ex. '    "version": "0.3.1",'
			const { stdout, stderr } = await exec(`grep -m 1 "version" ${filepath}`);
			const version = stdout.split('"')[3];

			descriptions.push({
				name: filename!,
				version,
				createdStamp: stats.birthtimeMs,
				lastUpdatedStamp: stats.ctimeMs,
			});
		}

		return {
			success: true,
			message: 'in dev',
			fileList: descriptions,
		};
	} catch (e) {
		return {
			success: false,
			message: e.message,
		};
	}
}

export async function loginUser(params: { name: string }): Promise<ILoginResponse> {
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
		sessionId: newSession.id,
	};

	debug(`${name} connected`);
	debug(
		'online users:',
		Object.keys(onlineUsers).length === 0 ? '<none>' : Object.keys(onlineUsers).join(),
	);
}

export async function logoutUser(params: {
	name: string;
}): Promise<IStatusResponse<'UnknownUser' | 'AlreadyLoggedOut' | 'LogoutSuccessful'>> {
	const users = await getUsers();

	if (!users.includes(params.name))
		return {
			success: false,
			status: 'UnknownUser',
			message: `no user named ${params.name}`,
		};

	if (!getLoggedInUsers().includes(params.name)) {
		debug('user already logged out');
		return {
			success: false,
			status: 'AlreadyLoggedOut',
			message: `${params.name} already logged out`,
		};
	}

	doLogoutUser(params.name);
	return {
		success: true,
		status: 'LogoutSuccessful',
		message: `${params.name} successfully logged out`,
	};
}

export function doLogoutUser(name: string) {
	if (!onlineUsers[name]) return;
	handleLogoffForSession(name, onlineUsers[name].sessionId);
	delete onlineUsers[name];

	debug(`${name} disconnected.`);
	debug(
		'online users:',
		Object.keys(onlineUsers).length === 0 ? '<none>' : Object.keys(onlineUsers).join(),
	);
}

export async function signupUser(params: { name: string }): Promise<ISignupResponse> {
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

	await doSignup(params.name);
	doLoginUser(params.name);

	return {
		success: true,
		status: 'SignedUp',
		message: `${params.name} successfully signed up`,
	};
}

async function doSignup(name: string) {
	await mkdir(storageRoot + '/users/' + name);
	await mkdir(storageRoot + '/users/' + name + '/scenes');
}
