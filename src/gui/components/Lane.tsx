import * as React from 'react';
import './Lane.css';
import { LaneControls } from './LaneControls';
import { ILaneProps } from './types';

export const Lane: React.FunctionComponent<ILaneProps> = (props) => {
	return (
		<div className={['lane', getSpecificClass(), props.isSelected && 'selected'].join(' ')}>
			<LaneControls {...props} />
			<div className="section main-section">{props.children}</div>
		</div>
	);

	function getSpecificClass() {
		switch (props.laneType) {
			case 'DiatonicPianoRoll':
				return 'roll-lane';

			case 'SingleNoteLane':
				return 'drum-lane';

			default:
				return null;
		}
	}
};
