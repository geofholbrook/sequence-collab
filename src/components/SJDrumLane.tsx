import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';
import { SingleNoteLane } from '@musicenviro/ui-elements';
import * as React from 'react';

interface ISJDrumLane extends ISingleNoteLaneProps {
	index: number;
	synthName: string;
	availableInstruments: string[];
	onInstrumentChange?: (name: string) => void;
}

export function SJDrumLane(props: ISJDrumLane) {
	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				lineHeight: '50px',
				fontWeight: 'bold',
				color: '#777',
				width: 750,
			}}
		>
			<span>{props.index}</span>

			<select
				style={{ position: 'absolute', top: 15, left: 20, width: 80 }}
				onChange={(e) =>
					props.onInstrumentChange &&
					props.onInstrumentChange((e.target as HTMLSelectElement).value)
				}
			>
				{props.availableInstruments.map((name) => (
					<option key={name} value={name}>{name}</option>
				))}
			</select>

			<SingleNoteLane
				notes={props.notes}
				onChange={props.onChange}
				style={{ position: 'absolute', top: 0, left: 100, maxHeight: 50 }}
			/>
		</div>
	);
}
