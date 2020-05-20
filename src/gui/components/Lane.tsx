import React, { useState, useEffect } from 'react';
import './Lane.css';
import { LaneControls } from './LaneControls';
import { ILaneProps, ViewMode } from './types';
import { ViewContext } from './ViewContext';

export const Lane: React.FunctionComponent<ILaneProps> = (props) => {
	const [viewMode, setViewMode] = useState<ViewMode>('None');

	useEffect(() => setViewMode(props.laneType === 'DiatonicPianoRoll' ? 'Collapsed' : 'None'), [
		props.laneType,
	]);

	return (
		<div
			className={['lane', getSpecificClass(), props.isSelected && 'selected'].join(' ')}
			onClick={e => {
				const classes = (e.target as HTMLElement).className.split(' ');
				if (classes.includes('lane-whitespace')) {
					props.onLaneClick && props.onLaneClick(props.index);
				}
			}}
		>
			<LaneControls
				{...props}
				viewMode={viewMode}
				onExpand={() => setViewMode('Expanded')}
				onCollapse={() => setViewMode('Collapsed')}
			/>

			<div className="lane-panel lane-whitespace">
				<ViewContext.Provider value={[viewMode, setViewMode]}>
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
