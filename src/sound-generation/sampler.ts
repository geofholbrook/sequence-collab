import * as Tone from 'tone';

import { sampleFiles } from './samples-dir-listing';
import { Seconds } from '../@types';

const players: Array<Tone.Player> = [];

(async function () {
	let index = 0
	while (index < sampleFiles.length) {
		const filename = sampleFiles[index++];
		try {
			await new Promise((resolve, reject) => {
				const audioFile = require('./samples/' + filename);
				setTimeout(reject, 1000);


				const player = new Tone.Player(audioFile, () => {
					resolve();
				}).toDestination();

				

				players.push(player);
			});
		} catch (e) {
			console.log(filename, 'timed out');
		}
	}
})();

export function playSample(ac: AudioContext, startTime: Seconds, sampleIndex: number, volumeDb: number = 0) {
	
	players[sampleIndex].set({volume: volumeDb - 9})
	players[sampleIndex].start(startTime)
}
