import { kick, hihat, snare } from './drumSynth';
import { playSample } from './sampler';
import { ISynth } from '../gui/screens/Test';

import { sampleFiles } from './samples-dir-listing';
import { Seconds } from '../@types';
import { playBass } from './bassSynth';

export const drumSynths: ISynth[] = [
	{ name: 'kick', fn: kick },
	{ name: 'snare', fn: snare },
	{ name: 'hihat', fn: hihat },
	...sampleFiles.map((filename, n) => ({
		name: filename.slice(0, -4),
		fn: playSample,
		args: [n],
	})),
];

export const noteSynths: ISynth[] = [
	{ name: 'bass', fn: playBass }
]

export const synths = [...drumSynths, ...noteSynths]

export function callSynth(ac: AudioContext, synth: ISynth, time?: Seconds, ...args: any[]) {
	synth.fn(ac, time || ac.currentTime, ...(synth.args || []), ...args);
}


