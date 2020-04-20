import { ISession } from "../@types"

export const sessions: ISession[] = []

export function createSession(name: string): ISession {
    return {
        users: [name],
        createdStamp: Date.now()
    }
}