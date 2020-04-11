import { kick, hihat, snare } from './drumSynth';
import { playSample } from './sampler';
import { ISynth } from '../screens/Test';

import { sampleFiles } from './samples-dir-listing';
import { Seconds } from '../Scheduler/Scheduler';

export const synths: ISynth[] = [
	{ name: 'kick', fn: kick },
	{ name: 'snare', fn: snare },
	{ name: 'hihat', fn: hihat },
	...sampleFiles.map((filename, n) => ({
		name: filename.slice(0, -4),
		fn: playSample,
		extraArguments: [n],
	})),
];

export function callSynth(ac: AudioContext, synth: ISynth, time?: Seconds) {
	synth.fn(ac, time || ac.currentTime, ...(synth.extraArguments || []));
}
