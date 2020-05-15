import { IOnlineUser, ISession } from '../@types';

export const onlineUsers: {
	[index: string]: IOnlineUser;
} = {};

export const sessions: {
	[index: string]: ISession;
} = {};
