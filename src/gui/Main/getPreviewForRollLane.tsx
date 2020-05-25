import React from 'react';
import { CellGridPreview, ISimpleCell } from '@musicenviro/ui-elements';
import { IPianoRollLane } from '../../@types';

export function getPreviewForRollLane(lane: IPianoRollLane, onClick?: () => void) {
	const numRows = lane.treeLoopTimes.length;
	const numColumns = lane.stepRange.max - lane.stepRange.min + 1;

	const cells: ISimpleCell[] = lane.notes.map((note) => ({
		row: note.step || 0,
		column: note.treePointIndex,
		color: 'blue',
	}));

	return (
		<div onClick={onClick}>
			<CellGridPreview
				width={580}
				height={45}
				cells={cells}
				numRows={numRows}
				numColumns={numColumns}
			/>
		</div>
	);
}
