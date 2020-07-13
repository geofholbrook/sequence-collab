import { initRestApi } from './rest';
import { initWSApi } from './ws';

import Debug from 'debug';

export const debug = Debug('sj:server');
debug('test debug output');

async function run() {
	const restServer = await initRestApi();
	initWSApi();
}

run();
