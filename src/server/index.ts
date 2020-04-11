import { MessageServer } from "@geof/socket-messaging";
import { IMessage } from "../@types";

const server = new MessageServer<IMessage>(true)

server.onMessage(msg => {
	
	if (msg.type === 'NoteChange') {
		console.log(msg.content);
	}

	server.sendToAll(msg)
})
