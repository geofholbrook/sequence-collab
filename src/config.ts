
export const appId = "530431044551333"
export const nodeDropletIP = '167.172.3.7';

export const local = require('os').hostname() === 'localhost';
console.log(`local = ${local}`)

export const skipLoginForLocal = false;

export const saveInterval = 5000;