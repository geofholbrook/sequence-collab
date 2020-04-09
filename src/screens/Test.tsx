import * as React from 'react';
import { Seconds } from '../Scheduler/Scheduler';
import './Test.css';
import * as Tone from 'tone';
import { synths, callSynth } from '../sound-generation/synths';

let ac = Tone.context.rawContext as AudioContext;

export interface ISynth {
	name: string;
	fn: (ac: AudioContext, start: Seconds, ...args: any[]) => void;
	extraArguments?: any[];
}

export function Test() {
	return (
		<div className="Screen TestScreen">
			<header>test page</header>
			<div className="content">
				{synths.map((synth) => (
					<button key={synth.name} onClick={(e) => callSynth(ac, synth)} unselectable="on">
						{synth.name}
					</button>
				))}
			</div>
		</div>
	);
}
