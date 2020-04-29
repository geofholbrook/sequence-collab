import { MessageClient } from '@geof/socket-messaging';
import { IMessage } from './@types';
import { local, nodeDropletIP } from './config';

const serverURL = local ? 'ws://localhost:8080' : `ws://${nodeDropletIP}/ws`;
export const socketClient = new MessageClient<IMessage>(serverURL);
