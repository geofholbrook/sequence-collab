import { MessageClient } from '@geof/socket-messaging';
import { IMessage } from './@types';
import { local, nodeDropletIP } from './config';

const serverURL = local ? 'ws://localhost:8080' : `wss://${nodeDropletIP}/ws`;

export let socketClient: MessageClient<IMessage>;


export function initSocketClient(username: string) {
    socketClient = new MessageClient<IMessage>(serverURL, {
        identifier: username
    });
}


