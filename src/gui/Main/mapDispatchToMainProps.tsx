import { ILane, LaneProperties } from '../../@types';
import { Dispatch } from 'redux';
import { IReduxAction, IReduxSetCellAction } from '../../redux';

export function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setCell: (laneId: string, rowIndex: number, cellIndex: number, active: boolean) =>
			dispatch<IReduxSetCellAction>({
				type: 'SET_CELL',
				broadcast: true,
				rowIndex,
				laneId,
				cellIndex,
				active,
			}),
		addLane: (lane: ILane, after?: string) =>
			dispatch({
				type: 'ADD_LANE',
				broadcast: true,
				lane,
				after
			}),
		deleteLane: (laneId: string) =>
			dispatch({
				type: 'DELETE_LANE',
				broadcast: true,
				laneId,
			}),
		setLaneProperty: (
			laneId: string,
			property: LaneProperties,
			value: any,
		) =>
			dispatch({
				type: 'SET_LANE_PROPERTY',
				broadcast: true,
				laneId,
				property,
				value,
			}),
	};
}
