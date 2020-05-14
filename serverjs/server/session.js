"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = [];
function createSession(name) {
    return {
        users: [name],
        createdStamp: Date.now()
    };
}
exports.createSession = createSession;
