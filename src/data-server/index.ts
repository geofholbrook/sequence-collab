export const foo = 0 // all files must be modules?

import fs from 'fs'

const homedir = require('os').homedir();

const dataPath = homedir + '/.syncrojam-data'

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath)
    console.log(dataPath + ' created √')
} else {
    console.log(dataPath + ' exists √')
}

const dir = fs.readdirSync(dataPath)
console.log(dir)

