import { RestfulBridge } from 'restful-bridge';
import { local, nodeDropletIP } from './config';

// the following trick prevents the server code from getting loaded by the browser, but we still get the types.
// see http://ideasintosoftware.com/typescript-conditional-imports/

import { isBrowser } from 'browser-or-node';

import * as usersModule from './server/users';
import * as sceneModule from './server/scene';
import * as sessionModule from './server/session';

let users = (null as unknown) as typeof usersModule;
let scene = (null as unknown) as typeof sceneModule;
let session = (null as unknown) as typeof sessionModule;

if (!isBrowser) {
	users = require('./server/users');
	scene = require('./server/scene');
	session = require('./server/session');
}

const hostname = local ? 'http://localhost' : `https://${nodeDropletIP}`;
const requestPort = local ? 4040 : 80;

export const bridge = new RestfulBridge({
	hostname,
	requestPort,
	listenPort: 4040,
	apiPrefix: '/api',
});

/**
 * get online users
 */
export const [fetchOnlineUsers] = bridge.createRoute(
	'GET',
	'/users/online',
	users?.getLoggedInUsers,
);

/**
 * login
 */
export const [requestLogin] = bridge.createRoute(
	'POST',
	'/login',
	users?.loginUser,
);

/**
 * login
 */
export const [signalLogout] = bridge.createRoute(
	'POST',
	'/logout',
	users?.logoutUser
)

/**
 * signup
 */
export const [requestSignup] = bridge.createRoute(
	'POST',
	'/signup',
	users?.signupUser,
);

/**
 * get scene list
 */
export const [fetchFileList] = bridge.createRoute(
	'GET',
	'/scene/ls',
	users?.getFileListForUser,
);

/**
 * save scene
 */
export const [requestSave] = bridge.createRoute(
	'POST',
	'/scene/save',
	scene?.serveSaveSceneRequest,
);

/**
 * load scene
 */
export const [requestLoad] = bridge.createRoute(
	'GET',
	'/scene/load',
	scene?.serveLoadSceneRequest,
);

/**
 * get invite link
 */
export const [fetchInviteLink] = bridge.createRoute(
	'GET',
	'/request-invite-link',
	session?.getInviteLink,
);

/**
 * request session entry
 */
export const [requestSessionEntry] = bridge.createRoute(
	'POST',
	'/request-session-entry',
	session?.serveSessionEntryRequest,
);
