"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_messaging_1 = require("@geof/socket-messaging");
var debug_1 = __importDefault(require("debug"));
var users_1 = require("./users");
var debug = debug_1.default("sj:server:ws");
function initWSApi() {
    // TODO make this async
    var websocketServer = new socket_messaging_1.MessageServer({});
    websocketServer.onMessage(function (msg) {
        if (msg.type !== 'MousePosition') {
            debug(msg);
        }
        websocketServer.sendToAll(msg);
    });
    websocketServer.onConnectionClosed(function (id) {
        delete users_1.onlineUsers[id];
    });
    debug("WEBSOCKET server listening on port " + websocketServer.options.port);
    return websocketServer;
}
exports.initWSApi = initWSApi;
