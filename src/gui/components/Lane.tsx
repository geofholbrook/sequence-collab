import React, { useState } from 'react';
import './Lane.css';
import { LaneControls } from './LaneControls';
import { ILaneProps, ViewMode } from './types';
import { ViewContext } from './ViewContext';

export const Lane: React.FunctionComponent<ILaneProps> = (props) => {
	const [viewMode, setViewMode] = useState<ViewMode>(
		props.laneType === 'DiatonicPianoRoll' ? 'Collapsed' : 'None',
	);

	return (
		<div
			className={['lane', getSpecificClass(), props.isSelected && 'selected'].join(' ')}
			onClick={() => props.onLaneClick && props.onLaneClick(props.index)}
		>
			<table>
				<tr>
					<td>
						<LaneControls
							{...props}
							viewMode={viewMode}
							onExpand={() => setViewMode('Expanded')}
							onCollapse={() => setViewMode('Collapsed')}
						/>
					</td>
				</tr>
			</table>
						<div className="lane-panel">
							<ViewContext.Provider value={viewMode}>
								{props.children /* probably just one element */} 
							</ViewContext.Provider>
						</div>
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
