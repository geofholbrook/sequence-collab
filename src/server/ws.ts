import { MessageServer } from "@geof/socket-messaging";
import { IMessage } from "../@types";
import Debug from 'debug'
const debug = Debug("sj:server:ws")

export function initWSApi() {
	const websocketServer = new MessageServer<IMessage>({});
	websocketServer.onMessage(msg => {
		websocketServer.sendToAll(msg);
	});
    // TODO make this async
    
    debug(`WEBSOCKET server listening on port ${websocketServer.options.port}`)
    return websocketServer
}
