import * as Tone from 'tone';
import { Seconds } from '../Scheduler/Scheduler';

import { sampleFiles } from './samples-dir-listing';

const players: Array<Tone.Player> = [];

(async function () {
	let index = 0
	while (index < sampleFiles.length) {
		const filename = sampleFiles[index++];
		try {
			await new Promise((resolve, reject) => {
				const audioFile = require('./samples/' + filename);
				setTimeout(reject, 1000);
				const newIndex = players.length
				players.push(new Tone.Player(audioFile, () => {
					console.log(newIndex, 'loaded', filename);
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
