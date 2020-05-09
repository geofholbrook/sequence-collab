import { ISetLanePropertyAction, IReduxAction } from '../../redux';
import { ILaneControlsProps } from './LaneControls';
import { Dispatch } from 'redux';

export function mapDispatchToLaneControlsProps() {
	return (dispatch: Dispatch<IReduxAction>, ownProps: ILaneControlsProps) => ({
		onVolumeChange: (volumeDb: number) =>
			dispatch({
				type: 'SET_LANE_PROPERTY',
				broadcast: true,
				laneId: ownProps.laneId,
				property: 'volumeDb',
				value: volumeDb,
			} as ISetLanePropertyAction),
	});
}
