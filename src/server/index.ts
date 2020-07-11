import { initRestApi } from './rest';

import Debug from 'debug'
import { initWSApi } from './ws';

export const debug = Debug('sj:server');
debug('test debug output')

async function run() {
		const restServer = await initRestApi()
		initWSApi();
	}
	
run()

