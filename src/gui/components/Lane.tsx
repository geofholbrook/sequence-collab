import * as React from 'react';
import './Lane.css';
import { LaneControls } from './LaneControls';
import { ILaneProps } from './types';

export const Lane: React.FunctionComponent<ILaneProps> = (props) => {
	return (
		<div
			className={['lane', getSpecificClass(), props.isSelected && 'selected'].join(' ')}
			onClick={() => props.onLaneClick && props.onLaneClick(props.index)}
		>
			<table>
				<tr>
					<td>
						<LaneControls {...props} />
					</td>
					<td>
						<div className="lane-panel">{props.children}</div>
					</td>
				</tr>
			</table>
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

Lane.defaultProps = {
	viewMode: 'Expanded',
};
