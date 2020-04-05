import { ILoopNote, Seconds, IScheduledNote } from './Scheduler';
import { IRange } from '@musicenviro/base';
import { windowPosition } from './windowPosition';

export function getNewScheduledNotes(
	loop: ILoopNote[],
	acTime: Seconds,
	lookAhead: Seconds,
	prevHorizon: Seconds,
	loopLength: Seconds,
): {
	schedule: IScheduledNote[];
	horizon: Seconds;
} {
	const win: IRange<Seconds> = {
		min: Math.max(acTime, prevHorizon),
		max: acTime + lookAhead,
	};

	// express range as number of loops
	const rawPropWindow = { min: win.min / loopLength, max: win.max / loopLength };

	// translate range so that min falls between 0 and 1
	const translation = (rawPropWindow.min % 1) - rawPropWindow.min;
	const propWindow = {
		min: rawPropWindow.min + translation,
		max: rawPropWindow.max + translation,
	};

	const schedule = loop
		.map((note) => {
			const pos = windowPosition(note.loopTime, propWindow);
			if (!pos) return null;
			return {
				data: note.data,
				audioContextTime: (pos - translation) * loopLength,
			};
		})
		.filter(Boolean) as IScheduledNote<number>[];

	return {
		schedule,
		horizon: win.max,
	};
}


