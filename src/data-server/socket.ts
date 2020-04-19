import { MessageServer } from "@geof/socket-messaging";
import { IMessage } from "../@types";

export const socketServer = new MessageServer<IMessage>(true)

socketServer.onMessage(msg => {
    
    const session = 

	// if (msg.type === 'NoteChange') {
	// 	console.log(msg.content);
	// }

	socketServer.sendToAll(msg)
})
