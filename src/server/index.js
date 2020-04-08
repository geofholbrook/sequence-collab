"use strict";
exports.__esModule = true;
var socket_messaging_1 = require("@geof/socket-messaging");
var server = new socket_messaging_1.MessageServer(true);
server.onMessage(function (str) {
    // console.log(`Spraying message => ${str}`);
    server.sendToAll(str);
});
