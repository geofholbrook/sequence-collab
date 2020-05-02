import React from 'react'

import { Button } from 'semantic-ui-react';
import { ISJDrumLaneProps } from "./types";

export function LaneControls(props: ISJDrumLaneProps) {
	return <div className="section">
		<div className="section button-section">
			{props.isPlaceHolder ? (<Button icon="add circle" color="blue" onClick={(e) => props.onAddLane && props.onAddLane()}></Button>) : (<Button icon="trash" onClick={(e) => props.onDeleteLane && props.onDeleteLane(props.index)}></Button>)}
		</div>

		<div className="section more-buttons-section">
			{!props.isPlaceHolder && (<Button icon={props.isMuted ? 'volume off' : 'volume up'} color={props.isMuted ? 'yellow' : undefined} onClick={props.onMuteButton}></Button>)}
		</div>

		<div className="section selector-section">
			{!props.isPlaceHolder && (<select className="instrument-selector"
				// style={{ position: 'absolute', top: 15, left: 40, width: 80 }}
				onChange={(e) => props.onInstrumentChange &&
					props.onInstrumentChange((e.target as HTMLSelectElement).value)} value={props.synthName}>
				{(props.availableInstruments || []).map((name) => (<option key={name} value={name}>
					{name}
				</option>))}
			</select>)}
		</div>
	</div>;
}
