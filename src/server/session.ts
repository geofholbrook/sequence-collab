import { v1 as uuid } from 'uuid';
import {
	ISession,
	IRequestInviteLinkResponse,
	IRequestSessionEntryResponse,
} from '../@types';

import { onlineUsers, sessions } from './storage';
import { doLoadScene, getScenePath } from './scene';

import Debug from 'debug';
import { workingFileName } from '../config';
const debug = Debug('sj:server');

export function createSession(hostUsername: string): ISession {
	return {
		id: uuid(),
		host: hostUsername,
		guests: [],
		createdStamp: Date.now(),
	};
}

export async function getInviteLink(params: {
	hostUsername: string;
}): Promise<IRequestInviteLinkResponse> {
	const host = onlineUsers[params.hostUsername];
	if (!host) {
		return {
			success: false,
			status: 'NoLinkGenerated',
			message: "I'm sorry, you don't appear to be logged in ...",
		};
	}

	return {
		success: true,
		status: 'ValidLink',
		message: 'Link generated.',
		link: `https://jammr.io?invite=${host!.sessionId}`,
	};
}

export async function serveSessionEntryRequest(params: {
	guest: string;
	sessionId: string;
}): Promise<IRequestSessionEntryResponse> {
	const session = sessions[params.sessionId];
	if (!session) {
		return {
			success: false,
			message: 'Session not found.',
		};
	}

	const guest = Object.values(onlineUsers).find((user) => user.name === params.guest);
	if (!guest) {
		return {
			success: false,
			message: "You don't appear to be logged in.",
		};
	}

	// for now just load the most recently saved temp session.
	// TODO: should tell the host that a user is joining, so it can freeze the interface and deliver the current state.

	const hostScene = await doLoadScene(getScenePath(onlineUsers[session.host].name, workingFileName));
	if (!hostScene) {
		return {
			success: false,
			message: "Host session can't be loaded.",
		};
	}

	session.guests.push(params.guest);
	guest.sessionId = params.sessionId;

	return {
		success: true,
		message: 'Entry granted, host session loaded',
		scene: hostScene,
	};
}

export function handleLogoffForSession(loggingOffUser: string, sessionId: string) {
	debug('handleLogoffForSession', loggingOffUser, sessionId);

	const session = sessions[sessionId];
	if (session.host === loggingOffUser) {
		if (session.guests.length === 0) {
			delete sessions[sessionId];
		} else {
			// if host leaves, make one of the guests the host
			session.host = session.guests.shift()!;
		}
	} else {
		session.guests = session.guests.filter((guest) => guest !== loggingOffUser);
	}
}
