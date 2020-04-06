import { EventEmitter } from 'events';
import { getNewScheduledNotes } from './getNewScheduledNotes';

const lookahead = 0.1;
const timerInterval = 25;

export type Seconds = number;
export type PropTime = number; // proportional time (0 - 1)

export interface ILoopNote<T = number> {
	data: T;
	loopTime: PropTime;
}

export interface IScheduledNote<T = number> {
	data: T;
	audioContextTime: Seconds;
}

export class Scheduler<T> {
	ac!: AudioContext;
	timer!: NodeJS.Timer;

	loop: ILoopNote<T>[] = [];
	prevHorizon = 0; // how far we looked ahead on the last iteration

	emitter = new EventEmitter();
	loopLength = 2; // seconds

	setAudioContext(ac: AudioContext) {
		this.ac = ac;
	}

	setLoop(loop: ILoopNote<T>[]) {
		this.loop = loop;
	}

	start() {
		if (!this.timer) {
			this.timer = setInterval(() => this.iterate(), timerInterval);
		}
	}

	emitSchedule(notes: IScheduledNote<T>[]) {
		this.emitter.emit('schedule', notes);
	}

	onSchedule(callback: (notes: IScheduledNote<T>[]) => void) {
		this.emitter.on('schedule', callback);
	}

	iterate() {
        console.log(this.ac.currentTime)
        
		const {schedule, horizon} = getNewScheduledNotes(
            this.loop,
            this.ac.currentTime,
            lookahead,
			this.prevHorizon,
			this.loopLength,
            );
            console.log(this.ac.currentTime)
        
        this.prevHorizon = horizon

		if (schedule.length > 0) {
		    console.log(schedule.map(note => note.audioContextTime))
		    this.emitSchedule(schedule)
		}
	}
}