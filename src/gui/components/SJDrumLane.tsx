import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';
import { SingleNoteLane } from '@musicenviro/ui-elements';
import * as React from 'react';
import { Button } from 'semantic-ui-react';
import './SJDrumLane.css';

interface ISJDrumLane extends ISingleNoteLaneProps {
	index: number;
	synthName?: string;
	availableInstruments?: string[];
	onInstrumentChange?: (name: string) => void;
	
	isPlaceHolder?: boolean;
	onAddLane?: () => void;
	onDeleteLane?: (laneIndex: number) => void;

	isMuted?: boolean;
	onMuteButton?: () => void;
}

export function SJDrumLane(props: ISJDrumLane) {
	
	return (
		<div className={"sj-drum-lane" + (props.isPlaceHolder ? " placeholder" : "")}>
			<div className="section button-section">
			{props.isPlaceHolder 
				? <Button icon= 'add circle' color='blue' onClick={e => props.onAddLane && props.onAddLane()}></Button>
				: <Button icon='trash' onClick={e => props.onDeleteLane && props.onDeleteLane(props.index)}></Button>}
			</div>

			<div className="section more-buttons-section">
				{!props.isPlaceHolder && (
					
					<Button icon={props.isMuted 
						? 'volume off' : 'volume up'} 
							color={props.isMuted 
								? 'yellow' : undefined}
						onClick={props.onMuteButton}></Button>)}
					
			</div>

			<div className="section selector-section">
				{!props.isPlaceHolder && (
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
				)}
			</div>
			<div className="section main-section">
				{!props.isPlaceHolder && (
					<SingleNoteLane
						{...props}
						width={650}
						height={30}
					/>
				)}	
			</div>
		</div>
	);
}
