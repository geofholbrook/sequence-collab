import { kick, hihat, snare } from './drumSynth';
import { playSample } from './sampler';
import { ISynth } from '../screens/Test';

import { sampleFiles } from './samples-dir-listing';
import { Seconds } from '../Scheduler/Scheduler';

export const synths: ISynth[] = [
	{ name: '00-kick', fn: kick },
	{ name: '01-snare', fn: snare },
	{ name: '02-hihat', fn: hihat },
	...sampleFiles.map((filename, n) => ({
		name: (n + 3).toString().padStart(2, '0') + '-' + filename,
		fn: playSample,
		extraArguments: [n],
	})),
];

export function callSynth(ac: AudioContext, synth: ISynth, time?: Seconds) {
	synth.fn(ac, time || ac.currentTime, ...(synth.extraArguments || []));
}
