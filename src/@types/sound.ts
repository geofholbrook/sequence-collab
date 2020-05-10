import { Seconds } from ".";

export interface ISynth {
	name: string;
	fn: (ac: AudioContext, start: Seconds, ...args: any[]) => void;
	init?: (ac: AudioContext) => void;
	args?: any[];
}
