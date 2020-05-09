import React from 'react';

import { Button } from 'semantic-ui-react';
import { ILaneProps } from './types';

import { VolumeKnob } from '@musicenviro/ui-elements';

import { connect } from 'react-redux';
import { ISetLanePropertyAction } from '../../redux';

export const LaneControls = connect(null, (dispatch, ownProps: ILaneProps) => ({
	onVolumeChange: (volumeDb: number) =>
		dispatch({
			type: 'SET_LANE_PROPERTY',
			broadcast: true,
			laneId: ownProps.laneId,
			property: 'volumeDb',
			value: volumeDb,
		} as ISetLanePropertyAction),
}))((props: ILaneProps) => {
	return (
		<div className="lane-controls">
			{/* <div className="section button-section"> */}

			<table>
				<tr>
					<td>
						<VolumeKnob
							initialDb={props.volumeDb}
							size={35}
							indicatorColor="lightgreen"
							onChange={props.onVolumeChange}
						/>
					</td>
					<td>
						<Button
							icon={props.isMuted ? 'volume off' : 'volume up'}
							color={props.isMuted ? 'yellow' : undefined}
							onClick={props.onMuteButton}
						/>
					</td>
					<td>
						<select
							className="instrument-selector"
							// style={{ position: 'absolute', top: 15, left: 40, width: 80 }}
							onChange={(e) =>
								props.onInstrumentChange &&
								props.onInstrumentChange((e.target as HTMLSelectElement).value)
							}
							value={props.synthName}
						>
							{(props.availableInstruments || []).map((name) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</select>
					</td>
				</tr>
			</table>

			{/* </div> */}

			{/* <div className="section selector-section"> */}
			{/* </div> */}
		</div>
	);
});
