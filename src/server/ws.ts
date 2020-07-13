import { MessageServer } from "@geof/socket-messaging";
import { IMessage, ISession } from "../@types";
import { logoutUser } from "./users"
import { onlineUsers, sessions } from "./storage";

import Debug from 'debug'
const debug = Debug("sj:server:ws")

let websocketServer: MessageServer<IMessage>;

export function initWSApi() {
	// TODO make this async
	websocketServer = new MessageServer<IMessage>({});
	
	websocketServer.onMessage(msg => {
		if (msg.type !== 'MousePosition') {
			debug(msg)
		}

		forwardToSessionUsers(msg);
		
		// disable this for now.
		// websocketServer.sendToAll(msg);
	});
	
	websocketServer.onConnectionClosed((id: string) => {
		// logoutUser({name: id})
	})

	setInterval(() => 
		Object.values(onlineUsers).forEach(user => {
			websocketServer.send(user.name, {
				type: 'SessionInfo',
				content: sessions[user.sessionId]
			})
	}), 1000)

    debug(`WEBSOCKET server listening on port ${websocketServer.options.port}`)
    return websocketServer
}

function forwardToSessionUsers(msg: IMessage) {
	// some validation
	if (!msg.user) return
		
	const user = onlineUsers[msg.user];
	if (!user) return

	const session = sessions[user.sessionId]
	if (!session) return

	// remove distinction between host and guests
	const sessionUsers = [session.host, ...session.guests]

	if (sessionUsers.length === 1) {
		if (sessionUsers[0] !== msg.user) {
			debug('hey, this user is a guest but there is no host')
		}
	} else {
		// forward to all session users, except self
		sessionUsers.forEach(user => {
			if (user === msg.user) return
			websocketServer.send(user, msg)
		})
	}
}

