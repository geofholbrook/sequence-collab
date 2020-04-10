import * as Tone from 'tone';
import { Seconds } from '../Scheduler/Scheduler';

import { sampleFiles } from './samples-dir-listing';

const players: Array<Tone.Player> = [];

(async function () {
	while (sampleFiles.length > 0) {
		const filename = sampleFiles.shift();
		
		try {
			await new Promise((resolve, reject) => {
				const audioFile = require('./samples/' + filename);
				setTimeout(reject, 1000);

				players.push(new Tone.Player(audioFile, () => {
					// console.log('loaded', filename);
					resolve();
				}).toDestination());
			});
		} catch (e) {
			console.log(filename, 'timed out');
		}
	}
})();

export function playSample(ac: AudioContext, startTime: Seconds, sampleIndex: number) {
    players[sampleIndex].start(startTime)
}
