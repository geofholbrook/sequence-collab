import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Beforeunload } from 'react-beforeunload';

import { IPoint, subtractPoints } from '@musicenviro/base';

import { ILane, SaveState, IRollLane, IDrumLane, LaneProperties, ISession, INote } from '../../@types';
import { drumSynths, noteSynths } from '../../sound-generation/synths';
import { newLaneForSynth } from '../../state-helpers/newLaneForSynth';
import { Lane } from '../components/Lane';
import { local, cycleDrumSynthsWhenAdding } from '../../config';

import Cursor from './resources/cursor_PNG99.png';
import './resources/Main.css';
import { connect } from 'react-redux';
import { mapStateToMainProps } from './mapStateToMainProps';
import { mapDispatchToMainProps } from './mapDispatchToMainProps';
import { SaveStateDisplay } from './SaveStateDisplay';
import { DiatonicPianoRoll, SingleNoteLane, IRhythmTree, getRhythmPoints } from '@musicenviro/ui-elements';
import { getPreviewForRollLane } from './getPreviewForRollLane';
import { ViewContext } from '../components/ViewContext';
import { getColorFromString } from './colors';
import { requestInviteLink } from '../../client/rest/requests';
import { SessionStatus } from './SessionStatus';
import { MainTopPanel } from './MainTopPanel';
import { setLaneTree } from '../../state-helpers/setLaneTree';

export interface IMainProps {
	userInfo: { name: string };
	sessionInfo: ISession | null;
	saveState: SaveState;
	masterRhythmTree: IRhythmTree;
	lanes: ILane[];
	remoteMouse: IPoint | null;

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;
	onMousePositionUpdate: (point: IPoint) => void;

	// dispatch mappings
	setCell: (laneId: string, rowIndex: number, cellIndex: number, active: boolean) => void;
	addLane: (lane: ILane, after?: string) => void;
	deleteLane: (laneId: string) => void;
	setLaneProperty: (laneId: string, property: LaneProperties, value: any) => void;
	rotate: (amount: number) => void;
}

function Main(props: IMainProps) {
	const mousePosition = useRef<IPoint>({ x: -10, y: -10 });
	const contentDivRef = useRef<HTMLDivElement>(null);

	const [selectedLaneId, setSelectedLaneId] = useState<string>();
	
	useEffect(() => {
		// console.log('MAIN MOUNTING');
		const mouseTimer = setInterval(reportMousePosition, 100);
		return () => {
			clearInterval(mouseTimer);
		};
	}, [reportMousePosition]);

	function findLane(id: string) {
		return props.lanes.find((lane) => lane.laneId === id);
	}

	function getLaneIndex(id: string) {
		return props.lanes.findIndex((lane) => lane.laneId === id);
	}

	useEffect(() => {
		if (props.lanes.length > 0 && selectedLaneId && !findLane(selectedLaneId))
			setSelectedLaneId(props.lanes[0].laneId);
	}, [props.lanes]);

	const setCell = props.setCell;

	const handlePianoRollCellChange = useCallback(
		(id: string, rowIndex: number, cellIndex: number, active: boolean) => {
			setCell(id, rowIndex, cellIndex, active);
		},
		[setCell],
	);

	function handleMouseMove(event: React.MouseEvent) {
		mousePosition.current = { x: event.clientX, y: event.clientY };
	}

	function reportMousePosition() {
		if (!contentDivRef.current) return;

		// report position relative to content div
		const rect = contentDivRef.current.getBoundingClientRect();
		const topLeft = { x: rect.left, y: rect.top };

		props.onMousePositionUpdate(subtractPoints(mousePosition.current, topLeft));
	}

	function handleManualNoteChange(laneId: string, notes: number[]) {
		props.setLaneProperty(laneId, 'notes', notes.map((note):INote => ({
			treePointIndex: note
		})));
	}

	function handleManualInstrumentChange(laneId: string, synthName: string) {
		props.setLaneProperty(laneId, 'synthName', synthName);
		props.setLaneProperty(laneId, 'color', getColorFromString(synthName));
	}

	function handleManualAddDrumLane() {
		const newLane = setLaneTree(newLaneForSynth(getNextSynth()), props.masterRhythmTree)
		props.addLane(newLane, selectedLaneId);

		function getNextSynth(): string {
			const prevDrumSynthName = drumSelected();
			if (!prevDrumSynthName) return drumSynths[0].name;

			if (cycleDrumSynthsWhenAdding) {
				const prevSynthIndex = drumSynths.findIndex(
					(synth) => synth.name === prevDrumSynthName,
				);
				return drumSynths[(prevSynthIndex + 1) % drumSynths.length].name;
			} else {
				return prevDrumSynthName;
			}
		}

		function drumSelected() {
			if (!selectedLaneId) return null;
			const lane = findLane(selectedLaneId);
			if (!lane) return null; // shouldn't happen
			if (lane.laneType !== 'SingleNoteLane') return null;
			return lane.synthName;
		}
	}

	function handleManualAddDiatonicLane() {
		props.addLane(newLaneForSynth(noteSynths[0].name));
	}

	function handleDeleteButton() {
		// need lane ids (not indexes) to delete multiple lanes.
		if (!selectedLaneId) return;

		const index = getLaneIndex(selectedLaneId);
		const newSelectedId =
			index === props.lanes.length - 1
				? props.lanes[index - 1]?.laneId
				: props.lanes[index + 1].laneId;

		props.deleteLane(selectedLaneId);
		setSelectedLaneId(newSelectedId);
	}

	function toggleMute(laneId: string) {
		const prevMuteState = findLane(laneId)!.muted;
		props.setLaneProperty(laneId, 'muted', !prevMuteState);
	}

	// misnamed at the moment
	function toggleSelection(laneId: string) {
		// no multiple selection
		setSelectedLaneId(laneId);

		// if (selectedLanes.includes(laneIndex)) {
		// 	setSelectedLanes(selectedLanes.filter(n => n != laneIndex))
		// } else {

		// 	setSelectedLanes([...selectedLanes, laneIndex])
		// }
	}

	async function handleInviteButton() {
		try {
			const res = await requestInviteLink(props.userInfo.name);
			if (!res.success) throw new Error(res.message);
			console.log(res);

			// replace domain to current domain (so that localhost works too)
			const querystring = res.link!.split('?')[1];
			const link = window.location.origin + '?' + querystring;
			await navigator.clipboard.writeText(link);
			alert('invite link copied to clipboard');
		} catch (e) {
			alert('invite link request failed: ' + e.message);
		}
	}

	function renderLane(lane: ILane, laneIndex: number) {
		const availableInstruments = (lane.laneType === 'DiatonicPianoRoll'
			? noteSynths
			: drumSynths
		).map((synth) => synth.name);

		return (
			<Lane
				index={laneIndex}
				laneId={lane.laneId}
				key={'lane' + laneIndex}
				laneType={lane.laneType}
				synthName={lane.synthName}
				onInstrumentChange={(name: string) =>
					handleManualInstrumentChange(lane.laneId, name)
				}
				onDeleteLane={() => props.deleteLane(lane.laneId)}
				onLaneClick={() => toggleSelection(lane.laneId)}
				volumeDb={lane.volumeDb}
				isMuted={lane.muted}
				isSelected={selectedLaneId === lane.laneId}
				onMuteButton={() => toggleMute(lane.laneId)}
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
						<ViewContext.Consumer>
							{([viewMode, setViewMode]) =>
								viewMode === 'Expanded' ? (
									<DiatonicPianoRoll
										id={lane.laneId}
										width={584}
										height={300}
										stepRange={rollLane.stepRange}
										initialLanes={rollLane.rows}
										onCellChange={handlePianoRollCellChange}
									/>
								) : (
									getPreviewForRollLane(rollLane, () => setViewMode!('Expanded'))
								)
							}
						</ViewContext.Consumer>
					);
				}

				case 'SingleNoteLane': {
					const drumLane = lane as IDrumLane;
					return (
						<SingleNoteLane
							width={630}
							height={30}
							notes={drumLane.notes.map(note => note.treePointIndex)}
							tree={drumLane.rhythmTree}
							onChange={(notes) => handleManualNoteChange(lane.laneId, notes)}
							noteColor={drumLane.color}
						/>
					);
				}

				default:
					return null;
			}
		}
	}

	return (
		<div className="Screen MainScreen" onMouseMove={handleMouseMove}>
			<header>
				logged in as <span style={{ color: 'lightblue' }}>{props.userInfo.name}</span>
				<SessionStatus sessionInfo={props.sessionInfo} user={props.userInfo.name} />
				<SaveStateDisplay saveState={props.saveState} />
			</header>

			<div
				className="content foo"
				ref={contentDivRef}
				onClick={(e) => {
					if ((e.target as HTMLElement).className.split(' ').includes('content')) {
						setSelectedLaneId(undefined);
					}
				}}
			>
				<MainTopPanel 
					onStart={props.onStartAudio}
					onStop={props.onStopAudio}
					onAddDrum={handleManualAddDrumLane}
					onAddDiatonic={handleManualAddDiatonicLane}
					onTrash={handleDeleteButton}
					onInvite={handleInviteButton}
					onRotateLeft={() => props.rotate(-1)}
					onRotateRight={() => props.rotate(1)}
				/>

				{props.lanes.map((lane, index) => renderLane(lane, index))}
			</div>

			{props.remoteMouse && contentDivRef.current && (
				<img
					src={Cursor}
					id="remote-mouse"
					alt=""
					style={{
						// backgroundColor: 'blue',
						opacity: 0.3,
						position: 'fixed',
						left:
							props.remoteMouse.x +
							contentDivRef.current.getBoundingClientRect().left -
							5,
						top:
							props.remoteMouse.y + contentDivRef.current.getBoundingClientRect().top,
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
}

export const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);



