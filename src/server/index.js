"use strict";
exports.__esModule = true;
var socket_messaging_1 = require("@geof/socket-messaging");
var server = new socket_messaging_1.MessageServer(true);
console.log(__dirname);
server.onMessage(function (msg) {
    // if (msg.type === 'NoteChange') {
    // 	console.log(msg.content);
    // }
    server.sendToAll(msg);
});
