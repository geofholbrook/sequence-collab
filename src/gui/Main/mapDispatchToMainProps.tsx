import { LaneProperties, IScene, AnyLane } from '../../@types';

import { Dispatch } from 'redux';

import {
	IReduxAction,
	IReduxLoadStateAction,
	IAddLaneAction,
	IDeleteLaneAction,
	ISetLanePropertyAction,
	IRotateAction,
} from '../../redux';

export function mapDispatchToMainProps(dispatch: Dispatch<IReduxAction>) {
	return {
		onSuccessfulFileOpen: (scene: IScene) => {
			const action: IReduxLoadStateAction = {
				type: 'LOAD_STATE',
				broadcast: false,
				state: scene.reduxState,
				sceneName: scene.name,
			};
			dispatch(action);
		},

		addLane: (lane: AnyLane, after?: string) => {
			const action: IAddLaneAction = {
				type: 'ADD_LANE',
				broadcast: true,
				lane,
				after,
			};
			dispatch(action);
		},

		deleteLane: (laneId: string) => {
			const action: IDeleteLaneAction = {
				type: 'DELETE_LANE',
				broadcast: true,
				laneId,
			};
			dispatch(action);
		},

		setLaneProperty: (laneId: string, property: LaneProperties, value: any) => {
			const action: ISetLanePropertyAction = {
				type: 'SET_LANE_PROPERTY',
				broadcast: true,
				laneId,
				property,
				value,
			};
			dispatch(action);
		},

		rotate: (amount: number) => {
			const action: IRotateAction = {
				type: 'ROTATE',
				broadcast: true,
				amount,
			};
			dispatch(action);
		},
	};
}
