export const foo = 0; // all files must be modules?
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import { ICreateUserRequestBody } from './@types'
import Debug from 'debug'
const debug = Debug('sj:data-server')
const homedir = require('os').homedir();
const dataPath = homedir + '/.syncrojam-data';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!fs.existsSync(dataPath)) {
	fs.mkdirSync(dataPath);
	console.log(dataPath + ' created √');
} else {
	// console.log(dataPath + ' exists √');
}

function getUsers() {
	return fs
		.readdirSync(dataPath + '/users', { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

app.get('/api/users', (req, res) => {
	console.log(req.hostname, 'requested', req.url);
	res.send(JSON.stringify(getUsers()));
	res.end();
});

app.post('/api/create-user', (req, res) => {
	const body = req.body as ICreateUserRequestBody
	debug(req.url, JSON.stringify(body))
	createNewUser(body.name)
});

function createNewUser(name: string) {
	// check if user exists
	const users = getUsers()
	if (users.includes(name)) {
		console.log('user already exists')
	} else {
		console.log('ok i can do that, ' + name)
	} 
}

app.listen(4040, () => console.log(`listening at http://localhost:4040`));
