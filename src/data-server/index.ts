import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import Debug from 'debug';
import { getUsersSync, loginUser, signupUser } from './users';
import { dataPath } from './dataPath';
import { ICreateUserParams, ILoginParams } from '../@types';

// import 'dotenv/config'

const debug = Debug('sj:server');
debug('test debug output')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (!fs.existsSync(dataPath)) {
	fs.mkdirSync(dataPath);
	console.log(dataPath + ' created √');
	
	fs.mkdirSync(dataPath + "/users");
	console.log(dataPath + '/users created √');

} else {
	// console.log(dataPath + ' exists √');
}

app.get('/api/users', (req, res) => {
	console.log(req.hostname, 'requested', req.url);
	res.send(JSON.stringify(getUsersSync()));
	res.end();
});

app.post('/api/login', async (req, res) => {
	const params = req.body as ILoginParams;
	debug(req.url, JSON.stringify(params));
	const response = await loginUser(params)
	res.end(JSON.stringify(response))
})

createPostRoute('/api/signup', signupUser)

function createPostRoute(url: string, handler: (params: any) => Promise<any>) {
	app.post(url, async (req, res) => {
		debug(req.url, JSON.stringify(req.body));
		const response = await handler(req.body)
		res.end(JSON.stringify(response))
	})
}

app.listen(4040, () => console.log(`listening at http://localhost:4040`));
