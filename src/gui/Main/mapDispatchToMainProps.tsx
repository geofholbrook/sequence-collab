import { ILane, LaneProperties } from '../../@types';
import { Dispatch } from 'redux';
import { IReduxAction, IReduxSetCellAction } from '../../redux';

export function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setCell: (laneIndex: number, rowIndex: number, cellIndex: number, active: boolean) =>
			dispatch<IReduxSetCellAction>({
				type: 'SET_CELL',
				broadcast: true,
				rowIndex,
				laneIndex,
				cellIndex,
				active,
			}),
		addLane: (lane: ILane) =>
			dispatch({
				type: 'ADD_LANE',
				broadcast: true,
				lane,
			}),
		deleteLane: (laneIndex: number) =>
			dispatch({
				type: 'DELETE_LANE',
				broadcast: true,
				laneIndex,
			}),
		setLaneProperty: (
			laneIndex: number,
			property: LaneProperties,
			value: any,
		) =>
			dispatch({
				type: 'SET_LANE_PROPERTY',
				broadcast: true,
				laneIndex,
				property,
				value,
			}),
	};
}
