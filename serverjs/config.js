"use strict";
// -----------------------------------------------------------------------------
// client config
// -----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDropletIP = 'jammr.io'; // '167.172.3.7';
exports.local = require('os').hostname() === 'localhost';
console.log("local = " + exports.local);
exports.skipLoginForLocal = false;
exports.saveInterval = 5000;
// -----------------------------------------------------------------------------
// GUI behaviour
// -----------------------------------------------------------------------------
exports.cycleDrumSynthsWhenAdding = false;
// -----------------------------------------------------------------------------
// server config
// -----------------------------------------------------------------------------
exports.allowDuplicateLogins = true;
