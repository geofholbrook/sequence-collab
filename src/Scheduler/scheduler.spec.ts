import { expect } from 'chai';
import { getNewScheduledNotes } from './getNewScheduledNotes';
import { windowPosition } from './windowPosition';
import { sjdm } from '@musicenviro/base';

describe('getNewScheduledNotes', () => {
	it('returns the right notes', () => {
		const loop = [
			{ data: 1, loopTime: 0.1 },
			{ data: 1, loopTime: 0.3 },
			{ data: 1, loopTime: 0.7 },
			{ data: 1, loopTime: 0.9 },
		];

		const loopLength = 10;
		const now = 18;
		const lookAhead = 4;
		const prevHorizon = 0;

		const result = getNewScheduledNotes(
			loop,
			now,
			lookAhead,
			prevHorizon,
			loopLength,
		).schedule.map((note) => note.audioContextTime);

		expect(result).to.have.length(2).and.to.include(19).and.to.include(21)
	});
});

describe('windowPosition', () => {
	it('returns correct PropTime or null values', () => {
		const propWindow = { min: 0.8, max: 1.2 };

		expect(windowPosition(0.9, propWindow)).to.be.equal(0.9);
		expect(windowPosition(0.1, propWindow)).to.be.equal(1.1);
		expect(windowPosition(0.3, propWindow)).to.be.equal(null);
	});
});
