import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import { Beforeunload } from 'react-beforeunload';
import { Button, Icon } from 'semantic-ui-react';

import { IPoint } from '@musicenviro/base';

import { ILane, SaveState, IRollLane, IDrumLane } from '../../@types';
import { drumSynths, noteSynths } from '../../sound-generation/synths';
import { newLaneForSynth } from '../../state-helpers/newLaneForSynth';
import { DrumLane } from '../components/DrumLane';
import { local } from '../../config';

import Cursor from './resources/cursor_PNG99.png';
import './resources/Main.css';
import { connect } from 'react-redux';
import { mapStateToMainProps } from './mapStateToMainProps';
import { mapDispatchToMainProps } from './mapDispatchToMainProps';
import { SaveStateDisplay } from './SaveStateDisplay';
import { RollLane } from '../components/RollLane';

interface IMainProps {
	userInfo: { name: string };
	saveState: SaveState;

	drumLanes: ILane[];
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
	
	const [mousePosition, setMousePosition] = useState<IPoint>({ x: -10, y: -10 });
	
	useEffect(() => {
		console.log('MAIN MOUNTING');
		const mouseTimer = setInterval(reportMousePosition, 100);
		return () => {
			clearInterval(mouseTimer)
		}
	}, [])

	return (
		<div className="Screen" onMouseMove={(event) => handleMouseMove(event)}>
			<header>
				logged in as{' '}
				<span style={{ color: 'lightblue' }}>{props.userInfo.name}</span>
				<SaveStateDisplay saveState={props.saveState} />
			</header>

			<div className="content">
				{renderButtons()}
				{props.drumLanes.map((lane, index) => renderLane(lane, index))}
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
			.indexOf(_.last(props.drumLanes)?.synthName || '');

		const newSynth = drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;

		props.addLane(newLaneForSynth(newSynth));
	}

	function handleManualAddDiatonicLane() {
		props.addLane(newLaneForSynth(noteSynths[0].name));
	}

	function toggleMute (laneIndex: number) {
		const prevMuteState = props.drumLanes[laneIndex].muted;
		props.setLaneProperty(laneIndex, 'muted', !prevMuteState);
	};

	function reportMousePosition() {
		props.onMousePositionUpdate(mousePosition);
	}

	function handleMouseMove(event: React.MouseEvent) {
		setMousePosition({ x: event.clientX, y: event.clientY });
	}

	function renderButtons() {
		return <div>
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
		</div>;
	}

	function renderLane(lane: ILane, laneIndex: number) {
		const generalProps = {
			index: laneIndex,
			key: 'lane' + laneIndex,
			onInstrumentChange: (name: string) =>
				handleManualInstrumentChange(laneIndex, name),
			onDeleteLane: (laneIndex: number) => props.deleteLane(laneIndex),
			isMuted: lane.muted,
			onMuteButton: () => toggleMute(laneIndex),
		};

		switch (lane.laneType) {
			case 'DiatonicPianoRoll': {
				const rollLane = lane as IRollLane;

				return (
					<RollLane
						{...generalProps}
						availableInstruments={noteSynths.map((synth) => synth.name)}
						width={600}
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
					<DrumLane
						{...generalProps}
						availableInstruments={drumSynths.map((synth) => synth.name)}
						synthName={lane.synthName}
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

export const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);
