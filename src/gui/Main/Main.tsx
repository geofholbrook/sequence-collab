import React, { useEffect, useState, useCallback, useRef } from 'react';
import _ from 'lodash';
import { Beforeunload } from 'react-beforeunload';
import { Button, Icon } from 'semantic-ui-react';

import { IPoint } from '@musicenviro/base';

import { ILane, SaveState, IRollLane, IDrumLane } from '../../@types';
import { drumSynths, noteSynths } from '../../sound-generation/synths';
import { newLaneForSynth } from '../../state-helpers/newLaneForSynth';
import { Lane } from '../components/Lane';
import { local } from '../../config';

import Cursor from './resources/cursor_PNG99.png';
import './resources/Main.css';
import { connect } from 'react-redux';
import { mapStateToMainProps } from './mapStateToMainProps';
import { mapDispatchToMainProps } from './mapDispatchToMainProps';
import { SaveStateDisplay } from './SaveStateDisplay';
import { DiatonicPianoRoll, SingleNoteLane } from '@musicenviro/ui-elements';

export interface IMainProps {
	userInfo: { name: string };
	saveState: SaveState;

	lanes: ILane[];
	remoteMouse: IPoint | null;

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;
	onMousePositionUpdate: (point: IPoint) => void;

	// dispatch mappings
	setCell: (laneIndex: number, rowIndex: number, cellIndex: number, active: boolean) => void;
	addLane: (lane: ILane) => void;
	deleteLane: (index: number) => void;
	setLaneProperty: (
		index: number,
		property: 'synthName' | 'loopTimes' | 'muted',
		value: any,
	) => void;
}

function Main(props: IMainProps) {
	const mousePosition = useRef<IPoint>({ x: -10, y: -10 });
	const [selectedLanes, setSelectedLanes] = useState<number[]>([0]);

	useEffect(() => {
		console.log('MAIN MOUNTING');
		const mouseTimer = setInterval(reportMousePosition, 100);
		return () => {
			clearInterval(mouseTimer);
		};
	}, []);

	function handleMouseMove(event: React.MouseEvent) {
		mousePosition.current = { x: event.clientX, y: event.clientY };
	}

	function reportMousePosition() {
		props.onMousePositionUpdate(mousePosition.current)
	}

	return (
		<div className="Screen" onMouseMove={handleMouseMove}>
			<header>
				logged in as <span style={{ color: 'lightblue' }}>{props.userInfo.name}</span>
				<SaveStateDisplay saveState={props.saveState} />
			</header>

			<div className="content">
				{renderButtons()}
				{props.lanes.map((lane, index) => renderLane(lane, index))}
			</div>

			{props.remoteMouse && (
				<img
					src={Cursor}
					id="remote-mouse"
					alt=""
					style={{
						// backgroundColor: 'blue',
						opacity: 0.3,
						position: 'fixed',
						left: props.remoteMouse.x,
						top: props.remoteMouse.y,
						height: 20,
						width: 20,
					}}
				/>
			)}

			{!local && props.saveState !== 'Clean' && (
				<Beforeunload onBeforeunload={() => "This message doesn't seem to appear"} />
			)}
		</div>
	);

	function handlePianoRollCellChange(
		laneIndex: number,
		rowIndex: number,
		cellIndex: number,
		active: boolean,
	) {
		props.setCell(laneIndex, rowIndex, cellIndex, active);
	}

	function handleManualNoteChange(laneIndex: number, notes: number[]) {
		props.setLaneProperty(laneIndex, 'loopTimes', notes);
	}

	function handleManualInstrumentChange(laneIndex: number, synthName: string) {
		props.setLaneProperty(laneIndex, 'synthName', synthName);
	}

	function handleManualAddDrumLane() {
		const prevSynthIndex = drumSynths
			.map((synth) => synth.name)
			.indexOf(_.last(props.lanes)?.synthName || '');

		const newSynth = drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;

		props.addLane(newLaneForSynth(newSynth));
	}

	function handleManualAddDiatonicLane() {
		props.addLane(newLaneForSynth(noteSynths[0].name));
	}

	function handleDeleteButton() {
		// need lane ids (not indexes) to delete multiple lanes.
		props.deleteLane(selectedLanes[0])
	}

	function toggleMute(laneIndex: number) {
		const prevMuteState = props.lanes[laneIndex].muted;
		props.setLaneProperty(laneIndex, 'muted', !prevMuteState);
	}





	function toggleSelection(laneIndex: number) {
		// no multiple selection
		setSelectedLanes([laneIndex])
		
		// if (selectedLanes.includes(laneIndex)) {
		// 	setSelectedLanes(selectedLanes.filter(n => n != laneIndex))
		// } else {
			
		// 	setSelectedLanes([...selectedLanes, laneIndex])
		// }
	}

	function renderButtons() {
		return (
			<div>
				<Button
					icon="trash"
					onClick={handleDeleteButton}
				/>
				<Button icon circular onClick={handleManualAddDrumLane}>
					<Icon name="plus" color="blue" /> Drum
				</Button>
				<Button icon circular onClick={handleManualAddDiatonicLane}>
					<Icon name="plus" color="green" /> Diatonic
				</Button>
				<Button icon onClick={props.onStopAudio}>
					<Icon name="reply" />
				</Button>
				<Button icon onClick={props.onStopAudio}>
					<Icon name="share" />
				</Button>
				<Button icon onClick={props.onStopAudio}>
					<Icon name="stop" color="red" />
				</Button>
				<Button icon onClick={props.onStartAudio}>
					<Icon name="play" color="green" />
				</Button>
			</div>
		);
	}

	function renderLane(lane: ILane, laneIndex: number) {
		const availableInstruments = (lane.laneType === 'DiatonicPianoRoll'
			? noteSynths
			: drumSynths
		).map((synth) => synth.name);

		return (
			<Lane
				index={laneIndex}
				key={'lane' + laneIndex}
				laneType={lane.laneType}
				synthName={lane.synthName}
				onInstrumentChange={(name: string) => handleManualInstrumentChange(laneIndex, name)}
				onDeleteLane={(laneIndex: number) => props.deleteLane(laneIndex)}
				onLaneClick={(laneIndex: number) => toggleSelection(laneIndex)}
				isMuted={lane.muted}
				isSelected={selectedLanes.includes(laneIndex)}
				onMuteButton={() => toggleMute(laneIndex)}
				availableInstruments={availableInstruments}
			>
				{getInnerComponent()}
			</Lane>
		);

		function getInnerComponent() {
			switch (lane.laneType) {
				case 'DiatonicPianoRoll': {
					const rollLane = lane as IRollLane;
					return (
						<DiatonicPianoRoll
							width={602}
							height={300}
							stepRange={rollLane.stepRange}
							initialLanes={rollLane.rows}
							onCellChange={(rowIndex, cellIndex, active) =>
								handlePianoRollCellChange(laneIndex, rowIndex, cellIndex, active)
							}
						/>
					);
				}

				case 'SingleNoteLane': {
					const drumLane = lane as IDrumLane;
					return (
						<SingleNoteLane
							width={650}
							height={30}
							notes={drumLane.loopTimes}
							onChange={(notes) => handleManualNoteChange(laneIndex, notes)}
							noteColor={drumLane.color}
						/>
					);
				}

				default:
					return null;
			}
		}
	}
}

export const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);
