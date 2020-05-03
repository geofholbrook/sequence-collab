// -----------------------------------------------------------------------------
// client config
// -----------------------------------------------------------------------------

export const nodeDropletIP = '167.172.3.7';
export const local = require('os').hostname() === 'localhost';
console.log(`local = ${local}`)

export const skipLoginForLocal = true;

export const saveInterval = 5000;

// -----------------------------------------------------------------------------
// server config
// -----------------------------------------------------------------------------

export const allowDuplicateLogins = true
