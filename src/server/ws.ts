import { MessageServer } from "@geof/socket-messaging";
import { IMessage, ISession } from "../@types";

import Debug from 'debug'
import { onlineUsers } from "./storage";

const debug = Debug("sj:server:ws")

export function initWSApi() {
	// TODO make this async
	
	const websocketServer = new MessageServer<IMessage>({});
	
	websocketServer.onMessage(msg => {
		if (msg.type !== 'MousePosition') {
			debug(msg)
		}
		
		// disable this for now.
		// websocketServer.sendToAll(msg);
	});
	
	websocketServer.onConnectionClosed((id: string) => {
		delete onlineUsers[id]
	})

	setInterval(() => 
		Object.values(onlineUsers).forEach(user => {
			websocketServer.send(user.name, {
				type: 'SessionInfo',
				content: user.session
			})
	}), 1000)

    debug(`WEBSOCKET server listening on port ${websocketServer.options.port}`)
    return websocketServer
}
