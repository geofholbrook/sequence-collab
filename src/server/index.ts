import { MessageServer } from "@geof/socket-messaging";
import { IMessage } from "../@types";

const server = new MessageServer<IMessage>(true)

server.onMessage(str => {
	// console.log(`Spraying message => ${str}`);
	server.sendToAll(str)
})
