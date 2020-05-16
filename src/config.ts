// -----------------------------------------------------------------------------
// client config
// -----------------------------------------------------------------------------

export const nodeDropletIP = 'jammr.io'; // '167.172.3.7';
export const local = require('os').hostname() === 'localhost';
console.log(`local = ${local}`)

export const skipLoginForLocal = true;

export const saveInterval = 5000;

// -----------------------------------------------------------------------------
// GUI behaviour
// -----------------------------------------------------------------------------

export const cycleDrumSynthsWhenAdding = true

// -----------------------------------------------------------------------------
// server config
// -----------------------------------------------------------------------------

export const allowDuplicateLogins = true
