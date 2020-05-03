import { DiatonicPianoRoll } from '@musicenviro/ui-elements';
import * as React from 'react';
import './DrumLane.css';

import { LaneControls } from './LaneControls';

import { IRollLaneProps } from './types';

export function RollLane(props: IRollLaneProps) {
	return (
		<div className='lane roll-lane'>
			<LaneControls {...props} />

			<div className="section main-section">
				<DiatonicPianoRoll {...props} width={602}/>
			</div>
		</div>
	);
}


