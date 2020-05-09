import React from 'react';
import { IRollLane } from '../../@types';
import { CellGridPreview, ISimpleCell } from '@musicenviro/ui-elements';


export function getPreviewForRollLane(lane: IRollLane) {

    const cells: ISimpleCell[] = []
    const numRows = 16; // canned for now
    const numColumns = (lane.stepRange.max - lane.stepRange.min) + 1


    lane.rows.forEach((row, ci) => row.cells.forEach((cell, ri) => {
        if (cell.active) {
            cells.push({
                row: ri,
                column: numColumns - 1 - ci,
                color: 'blue'
            })
        }
    }))

    return <CellGridPreview width={602} height={60}
        cells={cells}
        numRows={numRows}
        numColumns={numColumns}
    
    />;

}
