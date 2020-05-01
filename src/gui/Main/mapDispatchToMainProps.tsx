import { ILane } from '../../@types';
import { Dispatch } from 'redux';
import { IReduxAction } from '../../redux';
export function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
	return {
		setCell: (laneIndex: number, cellIndex: number, active: boolean) => dispatch({
			type: 'SET_CELL',
			broadcast: true,
			laneIndex,
			cellIndex,
			active,
		}),
		setDrumLanes: (drumLanes: ILane[]) => dispatch({
			type: 'SET_DRUM_LANES',
			broadcast: true,
			drumLanes,
		}),
		addLane: (lane: ILane) => dispatch({
			type: 'ADD_LANE',
			broadcast: true,
			lane,
		}),
		deleteLane: (laneIndex: number) => dispatch({
			type: 'DELETE_LANE',
			broadcast: true,
			laneIndex,
		}),
		setLaneProperty: (laneIndex: number, property: 'synthName' | 'loopTimes' | 'muted', value: any) => dispatch({
			type: 'SET_LANE_PROPERTY',
			broadcast: true,
			laneIndex,
			property,
			value,
		}),
	};
}
