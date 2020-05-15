import { ISession, IRequestInviteLinkResponse, IRequestInviteLinkParams, IRequestSessionEntryParams, IRequestSessionEntryResponse } from "../@types"
export const sessions: ISession[] = []
import { v1 as uuid } from 'uuid'
import { onlineUsers } from "./storage"

import { loadScene, getScenePath } from './scene'

export function createSession(name: string): ISession {
    return {
        id: uuid(),
        host: name,
        guests: [],
        createdStamp: Date.now(),
    }
}

export async function getInviteLink(params: IRequestInviteLinkParams): Promise<IRequestInviteLinkResponse> {
    const host = onlineUsers[params.hostUsername]
    if (!host) {
        return {
            success: false,
            status: 'NoLinkGenerated',
            message: 'I\'m sorry, you don\'t appear to be logged in ...',
        }
    }

    return {
        success: true,
        status: 'ValidLink',
        message: 'Link generated.',
        link: `https://jammr.io?invite=${host!.session!.id}`
    }
}

export async function getSessionEntry(params: IRequestSessionEntryParams): Promise <IRequestSessionEntryResponse> {
    const host = Object.values(onlineUsers).find(user => user.session.id === params.sessionId)
    if (!host) {
        return {
            success: false,
            message: 'Session not found.',
        }
    }

    // for now just load the most recently saved temp session.
    // TODO: should tell the host that a user is joining, so it can freeze the interface and deliver the current state.
    
    const hostScene = await loadScene(getScenePath(host.name, 'temp'))
    if (!hostScene) {
        return {
            success: false,
            message: 'Host session can\'t be loaded.'
        }
    }

    return {
        success: true,
        message: 'Entry granted, host session loaded',
        scene: hostScene
    }
}