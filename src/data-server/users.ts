import fs from 'fs';
import { ICreateUserParams, ICreateUserResponse } from './@types';
import { dataPath } from "./dataPath";

export function getUsers() {
	return fs
		.readdirSync(dataPath + '/users', { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

export async function createNewUser(params: ICreateUserParams): Promise<ICreateUserResponse> {
	// check if user exists
	const users = getUsers();
	if (users.includes(name)) {
		return {
			success: false,
			message: 'user already exists'
		};
	}
	else {
		await doCreateNewUser(params);
		return {
			success: true,
			message: 'created new user ' + params.name
		};
	}
}

async function doCreateNewUser(params: ICreateUserParams) {
	return fs.promises.mkdir(dataPath + '/users/' + params.name);
}
