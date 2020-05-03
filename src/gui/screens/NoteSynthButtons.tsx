import React from 'react';
import { callSynth, noteSynths } from '../../sound-generation/synths';
import { ac } from './Test';

export function NoteSynthButtons() {
	return (<div>
		{noteSynths.map((synth) => (<button key={synth.name} onClick={(e) => callSynth(ac, synth)} unselectable="on">
			{synth.name}
		</button>))}
	</div>);
}
