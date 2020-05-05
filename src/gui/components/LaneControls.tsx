import React from 'react';

import { Button } from 'semantic-ui-react';
import { ILaneProps } from './types';

import { VolumeKnob } from '@musicenviro/ui-elements'

export function LaneControls(props: ILaneProps) {
	return (
		<div className="section">
			<div className="section button-section">
				<VolumeKnob size={30} />
			</div>

			<div className="section more-buttons-section">
				<Button
					icon={props.isMuted ? 'volume off' : 'volume up'}
					color={props.isMuted ? 'yellow' : undefined}
					onClick={props.onMuteButton}
				/>
			</div>

			<div className="section selector-section">
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
			</div>
		</div>
	);
}
