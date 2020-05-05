import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';
import { IDiatonicPianoRollProps } from '@musicenviro/ui-elements';
import { LaneType } from '../../@types'

export interface ILaneProps {
	index: number;
	laneType: LaneType;
	synthName: string;
	availableInstruments?: string[];
	volumeDb: number;
	isMuted: boolean;
	isSelected: boolean;
	onInstrumentChange?: (name: string) => void;
	onAddLane?: () => void;
	onDeleteLane?: (laneIndex: number) => void;
	onVolumeChange?: (volumeDb: number) => void;
	onMuteButton?: () => void;
	onLaneClick?: (laneIndex: number) => void;
}