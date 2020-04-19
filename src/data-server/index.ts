export const foo = 0; // all files must be modules?
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { ICreateUserParams } from './@types';
import Debug from 'debug';
import { createNewUser, getUsers } from './users';
import { dataPath } from './dataPath';

const debug = Debug('sj:data-server');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (!fs.existsSync(dataPath)) {
	fs.mkdirSync(dataPath);
	console.log(dataPath + ' created √');
} else {
	// console.log(dataPath + ' exists √');
}

app.get('/api/users', (req, res) => {
	console.log(req.hostname, 'requested', req.url);
	res.send(JSON.stringify(getUsers()));
	res.end();
});

app.post('/api/create-user', async (req, res) => {
	const params = req.body as ICreateUserParams;
	debug(req.url, JSON.stringify(params));
	const response = await createNewUser(params)
	res.end(JSON.stringify(response));
});

app.listen(4040, () => console.log(`listening at http://localhost:4040`));
