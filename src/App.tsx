import React from 'react';
import './App.css';

import { MultiNoteLanes } from '@musicenviro/ui-elements';
import { kick } from './drumSynth';
import { render } from 'react-dom';
import { Scheduler } from './Scheduler/Scheduler';

let ac: AudioContext;

class App extends React.Component {
	scheduler = new Scheduler<number>();
	ac = new AudioContext();
	constructor(props: {}) {
		super(props);

		this.scheduler.setAudioContext(this.ac)

		this.scheduler.setLoop( [
			{ data: 1, loopTime: 0 },
			{ data: 1, loopTime: 0.5 },
			{ data: 1, loopTime: 0.875 },
		]);

		this.scheduler.onSchedule(notes => 
			notes.forEach(note => kick(this.ac, note.audioContextTime))
		)
	}

	render() {
		return (
			<div className="App">
				<header>sequence collab</header>
				<div id="main">
					<MultiNoteLanes />
					<button onClick={() => this.scheduler.start()}>play</button>
				</div>
			</div>
		);
	}
}

export default App;
