import { SingleNoteLane } from '@musicenviro/ui-elements';
import * as React from 'react';
import './DrumLane.css';

import { LaneControls } from './LaneControls';

import { IDrumLaneProps } from './types';

export function DrumLane(props: IDrumLaneProps) {
	return (
		<div className={'lane drum-lane' + (props.isPlaceHolder ? ' placeholder' : '')}>
			<LaneControls {...props} />

			<div className="section main-section">
				{!props.isPlaceHolder && <SingleNoteLane {...props} width={650} height={30} />}
			</div>
		</div>
	);
}


