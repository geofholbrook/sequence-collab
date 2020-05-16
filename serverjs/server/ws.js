"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_messaging_1 = require("@geof/socket-messaging");
var users_1 = require("./users");
var storage_1 = require("./storage");
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("sj:server:ws");
var websocketServer;
function initWSApi() {
    // TODO make this async
    websocketServer = new socket_messaging_1.MessageServer({});
    websocketServer.onMessage(function (msg) {
        if (msg.type !== 'MousePosition') {
            debug(msg);
        }
        forwardToSessionUsers(msg);
        // disable this for now.
        // websocketServer.sendToAll(msg);
    });
    websocketServer.onConnectionClosed(function (id) {
        users_1.doLogoffUser(id);
    });
    setInterval(function () {
        return Object.values(storage_1.onlineUsers).forEach(function (user) {
            websocketServer.send(user.name, {
                type: 'SessionInfo',
                content: storage_1.sessions[user.sessionId]
            });
        });
    }, 1000);
    debug("WEBSOCKET server listening on port " + websocketServer.options.port);
    return websocketServer;
}
exports.initWSApi = initWSApi;
function forwardToSessionUsers(msg) {
    // some validation
    if (!msg.user)
        return;
    var user = storage_1.onlineUsers[msg.user];
    if (!user)
        return;
    var session = storage_1.sessions[user.sessionId];
    if (!session)
        return;
    // remove distinction between host and guests
    var sessionUsers = __spreadArrays([session.host], session.guests);
    if (sessionUsers.length === 1) {
        if (sessionUsers[0] !== msg.user) {
            debug('hey, this user is a guest but there is no host');
        }
    }
    else {
        // forward to all session users, except self
        sessionUsers.forEach(function (user) {
            if (user === msg.user)
                return;
            websocketServer.send(user, msg);
        });
    }
}
