import React from 'react';

import { Button, Icon } from 'semantic-ui-react';
import { ILaneProps, ViewMode } from './types';

import { VolumeKnob } from '@musicenviro/ui-elements';

import { connect } from 'react-redux';
import { Lane } from './Lane';
import { mapDispatchToLaneControlsProps } from './mapDispatchToLaneControlsProps';

export interface ILaneControlsProps extends ILaneProps {
	viewMode: ViewMode;
	onExpand?: () => void;
	onCollapse?: () => void;
}

export const LaneControls = connect(
	null,
	mapDispatchToLaneControlsProps(),
)((props: ILaneControlsProps) => {
	return (
		<div className="lane-controls lane-whitespace">
			<table className="lane-whitespace">
				<tbody className="lane-whitespace">
					<tr className="lane-whitespace">
						<td className="lane-whitespace">
							<div className="lane-whitespace" style={{ display: 'flex' }}>
								{renderAccordionIcon(
									props.viewMode,
									props.onExpand || (() => {}),
									props.onCollapse || (() => {}),
								)}
								<VolumeKnob
									initialDb={props.volumeDb}
									size={35}
									indicatorColor="lightgreen"
									onChange={props.onVolumeChange}
								/>
							</div>
						</td>
						<td className="lane-whitespace">
							<Button
								icon={props.isMuted ? 'volume off' : 'volume up'}
								color={props.isMuted ? 'yellow' : undefined}
								onClick={props.onMuteButton}
							/>
						</td>
						<td className="lane-whitespace">
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
				</tbody>
			</table>
		</div>
	);
});

// replace with wrench icon
function renderAccordionIcon(viewMode: ViewMode, onExpand: () => void, onCollapse: () => void) {
	switch (viewMode) {
		case 'Collapsed':
			return (
				<Icon
					style={{ color: '#444', paddingTop: 3, width: 20, height: 30 }}
					onClick={onExpand}
					name="wrench" // "caret right"
				/>
			);

		case 'Expanded':
			return (
				<Icon
					style={{ color: '#444', paddingTop: 3, width: 20, height: 30 }}
					onClick={onCollapse}
					name="wrench" // "caret down"
				/>
			);

		default:
			return <div className="lane-whitespace" style={{ width: 23 }} />;
	}
}
