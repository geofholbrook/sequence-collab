import { EventEmitter } from "events";


const lookahead = 0.1
const timerInterval = 25

export interface ILoopNote<T = number> {
    data: T;
    loopTime: number;
}

export interface IScheduledNote<T = number> {
    data: T;
    audioContextTime: number;
}

export class Scheduler<T> {
    
    ac!: AudioContext;
    timer!: NodeJS.Timer;

    loop: ILoopNote<T>[] = [];
    prevHorizon = 0; // how far we looked ahead on the last iteration

    emitter = new EventEmitter();
    loopLength = 2; // seconds

    setAudioContext(ac: AudioContext) {
        this.ac = ac
    }

    setLoop(loop: ILoopNote<T>[]) {
        this.loop = loop
    }

    start() {
        this.timer = setInterval(() => this.lookAhead(), timerInterval)
    }

    emitSchedule(notes: IScheduledNote<T>[]) {
        this.emitter.emit("schedule", notes)
    }

    onSchedule(callback: (notes: IScheduledNote<T>[]) => void) {
        this.emitter.on("schedule", callback)
    }

    lookAhead() {
        const now = this.ac.currentTime
        const horizon = now + lookahead
        const start = this.prevHorizon
        this.prevHorizon = horizon
        const startInLoop = start % this.loopLength
        const windowSize = horizon - start

        const newScheduledNotes = this.loop.filter(note => (note.loopTime - startInLoop + 1) % 1 < windowSize)
            .map(note => ({data: note.data, audioContextTime: (note.loopTime - startInLoop + 1) % 1 + start}))

        this.emitSchedule(newScheduledNotes)
    }
}