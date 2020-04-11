import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';
import { SingleNoteLane } from '@musicenviro/ui-elements';
import * as React from 'react';

interface ISJDrumLane extends ISingleNoteLaneProps {
	index: number;
	instrument: number;
	availableInstruments: string[]
}

export function SJDrumLane(props: ISJDrumLane) {
	return (
		<div
			style={{
				display: 'flex',
				lineHeight: '50px',
				fontWeight: 'bold',
				color: '#777',
			}}
		>
			<span>{props.index}</span>

			<SingleNoteLane
				notes={props.notes}
				onChange={props.onChange}
				style={{ maxHeight: 50 }}
				width={750}
				height={50}
			/>
		</div>
	);
}
