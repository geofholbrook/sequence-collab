import { SingleNoteLane } from '@musicenviro/ui-elements';
import * as React from 'react';
import './SJDrumLane.css';
import { LaneControls } from './LaneControls';
import { ISJDrumLaneProps } from './types';

export function SJDrumLane(props: ISJDrumLaneProps) {
	return (
		<div className={'sj-drum-lane' + (props.isPlaceHolder ? ' placeholder' : '')}>
			<LaneControls {...props} />

			<div className="section main-section">
				{!props.isPlaceHolder && <SingleNoteLane {...props} width={650} height={30} />}
			</div>
		</div>
	);
}


