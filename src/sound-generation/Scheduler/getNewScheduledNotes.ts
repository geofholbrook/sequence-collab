import { ILoopNote, IScheduledNote } from './Scheduler';
import { IRange } from '@musicenviro/base';
import { windowPosition } from './windowPosition';
import { Seconds } from '../../@types';

export function getNewScheduledNotes<T>(
	loop: ILoopNote<T>[],
	acTime: Seconds,
	lookAhead: Seconds,
	prevHorizon: Seconds,
	loopLength: Seconds,
): {
	schedule: IScheduledNote<T>[];
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
				audioContextTime: Math.max(acTime, (pos - translation) * loopLength)
			};
		})
		.filter(Boolean) as IScheduledNote<T>[];

	return {
		schedule,
		horizon: win.max,
	};
}


