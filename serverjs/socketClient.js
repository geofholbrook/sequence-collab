"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_messaging_1 = require("@geof/socket-messaging");
var config_1 = require("./config");
var serverURL = config_1.local ? 'ws://localhost:8080' : "ws://" + config_1.nodeDropletIP + "/ws";
function initSocketClient(username) {
    exports.socketClient = new socket_messaging_1.MessageClient(serverURL, {
        identifier: username
    });
}
exports.initSocketClient = initSocketClient;
