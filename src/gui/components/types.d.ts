import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';
import { IDiatonicPianoRollProps } from '@musicenviro/ui-elements';

export interface ILaneProps extends ISingleNoteLaneProps {
	index: number;
	synthName?: string;
	availableInstruments?: string[];
	isPlaceHolder?: boolean;
	isMuted?: boolean;
	onInstrumentChange?: (name: string) => void;
	onAddLane?: () => void;
	onDeleteLane?: (laneIndex: number) => void;
	onMuteButton?: () => void;
}

export type IDrumLaneProps = ISingleNoteLaneProps & ILaneProps

export type IRollLaneProps = IDiatonicPianoRollProps & ILaneProps