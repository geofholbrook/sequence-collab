import React, { useEffect, useState, useRef } from 'react';
import { Beforeunload } from 'react-beforeunload';
import { connect } from 'react-redux';

import { IPoint, subtractPoints, consoleDeleteMe, showJSON } from '@musicenviro/base';
import { SingleNoteLane, IRhythmTree, INote, PianoRoll } from '@musicenviro/ui-elements';

import {
	ILane,
	SaveState,
	LaneProperties,
	ISession,
	IPianoRollLane,
	AnyLane,
	IScene,
} from '../../@types';

import { drumSynths, noteSynths } from '../../sound-generation/synths';
import { newLaneForSynth } from '../../state-helpers/newLaneForSynth';
import { Lane } from '../components/Lane';
import { local, cycleDrumSynthsWhenAdding } from '../../config';

import Cursor from './resources/cursor_PNG99.png';
import './resources/Main.css';

import { mapStateToMainProps } from './mapStateToMainProps';
import { mapDispatchToMainProps } from './mapDispatchToMainProps';

import { MainTopPanel } from './MainTopPanel';
import { SaveStateDisplay } from './SaveStateDisplay';
import { SessionStatus } from './SessionStatus';
import { ViewContext } from '../components/ViewContext';
import { FileModal } from './FileModal';


import { getPreviewForRollLane } from './getPreviewForRollLane';
import { getColorFromString } from './colors';
import { requestInviteLink, requestFileListForUser } from '../../client/rest/requests';
import { setLaneTree } from '../../state-helpers/setLaneTree';
import { loadSceneFromServer } from '../../client/rest/scene';

export interface IMainProps {
	userInfo: { name: string, currentSceneName: string };
	sessionInfo: ISession | null;
	saveState: SaveState;
	masterRhythmTree: IRhythmTree;
	lanes: AnyLane[];
	remoteMouse: IPoint | null;

	// callbacks
	onStartAudio: () => void;
	onStopAudio: () => void;
	onMousePositionUpdate: (point: IPoint) => void;

	// dispatch mappings
	addLane: (lane: AnyLane, after?: string) => void;
	deleteLane: (laneId: string) => void;
	setLaneProperty: (laneId: string, property: LaneProperties, value: any) => void;
	rotate: (amount: number) => void;
	onSuccessfulFileOpen: (scene: IScene) => void;
}

function Main(props: IMainProps) {
	const mousePosition = useRef<IPoint>({ x: -10, y: -10 });
	const contentDivRef = useRef<HTMLDivElement>(null);

	const [selectedLaneId, setSelectedLaneId] = useState<string>();
	const [showFileModal, setShowFileModal] = useState<boolean>(false);

	const { onMousePositionUpdate } = props;

	useEffect(() => {
		// console.log('MAIN MOUNTING');
		const mouseTimer = setInterval(reportMousePosition, 100);
		return () => {
			clearInterval(mouseTimer);
		};

		function reportMousePosition() {
			if (!contentDivRef.current) return;

			// report position relative to content div
			const rect = contentDivRef.current.getBoundingClientRect();
			const topLeft = { x: rect.left, y: rect.top };

			onMousePositionUpdate(subtractPoints(mousePosition.current, topLeft));
		}
	}, [onMousePositionUpdate]);

	function findLane(id: string) {
		return props.lanes.find((lane) => lane.laneId === id);
	}

	function getLaneIndex(id: string) {
		return props.lanes.findIndex((lane) => lane.laneId === id);
	}

	useEffect(() => {
		if (props.lanes.length > 0 && (!selectedLaneId || !findLane(selectedLaneId))) {
			setSelectedLaneId(props.lanes[0].laneId);
		}
	}, [props.lanes]);

	function handleMouseMove(event: React.MouseEvent) {
		mousePosition.current = { x: event.clientX, y: event.clientY };
	}

	function handleDrumNoteChange(laneId: string, notes: number[]) {
		props.setLaneProperty(
			laneId,
			'notes',
			notes.map(
				(note): INote => ({
					treePointIndex: note,
				}),
			),
		);
	}

	function handleRollNoteChange(laneId: string, notes: INote[]) {
		props.setLaneProperty(laneId, 'notes', notes);
	}

	function handleManualInstrumentChange(laneId: string, synthName: string) {
		props.setLaneProperty(laneId, 'synthName', synthName);
		props.setLaneProperty(laneId, 'color', getColorFromString(synthName));
	}

	function handleManualAddDrumLane() {
		const newLane = setLaneTree(newLaneForSynth(getNextSynth()), props.masterRhythmTree);
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
		const newLane = setLaneTree(newLaneForSynth(noteSynths[0].name), props.masterRhythmTree);
		props.addLane(newLane);
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

	async function handleFileButton() {
		setShowFileModal(true);
	}

	async function handleFileModalOpen(fileName: string) {
		if (props.saveState === 'Clean') {
			consoleDeleteMe('ok')

			const res = await loadSceneFromServer(props.userInfo.name, fileName)
			if (res.success) {
				props.onSuccessfulFileOpen(res.scene!)
				setShowFileModal(false)
			} else {
				console.log(res)
			}
		}
	}

	function renderLane(lane: AnyLane, laneIndex: number) {
		const availableInstruments = (lane.laneType === 'PianoRoll' ? noteSynths : drumSynths).map(
			(synth) => synth.name,
		);

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
				case 'PianoRoll': {
					const rollLane = lane as IPianoRollLane;

					return (
						<ViewContext.Consumer>
							{([viewMode, setViewMode]) =>
								viewMode === 'Expanded' ? (
									<PianoRoll
										width={584}
										height={300}
										stepRange={lane.stepRange}
										zeroPitch={lane.zeroPitch}
										initialNotes={rollLane.notes}
										tree={lane.rhythmTree}
										onChange={(notes) => {
											console.log('roll change');
											handleRollNoteChange(lane.laneId, notes);
										}}
									/>
								) : (
									getPreviewForRollLane(rollLane, () => setViewMode!('Expanded'))
								)
							}
						</ViewContext.Consumer>
					);
				}

				case 'SingleNoteLane': {
					return (
						<SingleNoteLane
							width={630}
							height={30}
							notes={lane.notes.map((note) => note.treePointIndex)}
							tree={lane.rhythmTree}
							onChange={(notes) => handleDrumNoteChange(lane.laneId, notes)}
							noteColor={lane.color}
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
				&emsp; editing scene: <span style={{ color: 'lightgreen' }}>{props.userInfo.currentSceneName}</span>
				&emsp; <SessionStatus sessionInfo={props.sessionInfo} user={props.userInfo.name} />
				&emsp; <SaveStateDisplay saveState={props.saveState} />
				
			</header>

			<div
				className="content"
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
					onFileButton={handleFileButton}
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

			<FileModal 
				isOpen={showFileModal}
				onClose={() => setShowFileModal(false)}
				onOpenFile={handleFileModalOpen}
				username={props.userInfo.name}
				/>
		</div>
	);
}

export const MainConnected = connect(mapStateToMainProps, mapDispatchToMainProps)(Main);


