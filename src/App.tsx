import React from 'react';
import './App.css';

import { MultiNoteLanes } from '@musicenviro/ui-elements';
import { kick, snare, hihat } from './drumSynth';
import { Scheduler, ILoopNote } from './Scheduler/Scheduler';

const testLoop = [
	{ data: 1, loopTime: 0 },
	{ data: 1, loopTime: 0.5 },
	{ data: 1, loopTime: 0.875 },
];

class App extends React.Component {
	scheduler = new Scheduler<number>();
	ac! : AudioContext;
	
	subLoops: ILoopNote<number>[][] = [[],[],[],[]]

	constructor(props: {}) {
		super(props);

		// this.scheduler.setLoop(testLoop);

		this.scheduler.onSchedule(notes => 
			notes.forEach(note => {
				const fn = [hihat, hihat, snare, kick][note.data]
				fn(this.ac, note.audioContextTime)
			})
		)
	}

	startAudio() {
		if (this.ac) {
			this.ac.resume()
		} else {

			this.ac = new AudioContext();
			this.scheduler.setAudioContext(this.ac)
			this.scheduler.start()
		}
	}

	stopAudio() {
		this.ac && this.ac.suspend()
	}

	handleNoteChange(instr: number, notes: number[]) {
		this.subLoops[instr] = notes.map(note => ({
			data: instr,
			loopTime: note
		}))

			this.scheduler.setLoop(([] as ILoopNote[]).concat(...this.subLoops))
	}

	render() {
		return (
			<div className="App">
				<header>sequence collab</header>
				<div id="main">
					<MultiNoteLanes 
						onChange={(instr, notes) => { this.handleNoteChange(instr, notes)}}
					/>
					<button onClick={() => this.startAudio()}>play</button>
					<button onClick={() => this.stopAudio()}>pause</button>
				</div>
			</div>
		);
	}
}

export default App;
