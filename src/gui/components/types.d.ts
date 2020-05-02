import { ISingleNoteLaneProps } from '@musicenviro/ui-elements/lib/components/SingleNoteLane/@types';

export interface ISJDrumLaneProps extends ISingleNoteLaneProps {
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
