import { MessageServer } from "@geof/socket-messaging";
import { IMessage } from "../@types";

import Debug from 'debug'
import { onlineUsers } from "./users";

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


    debug(`WEBSOCKET server listening on port ${websocketServer.options.port}`)
    return websocketServer
}
