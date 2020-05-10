import React, { useEffect } from 'react';
import './Test.css';
import { Seconds } from '../../@types';

import { monoDjembe } from '../../sound-generation/faust/monoDjembe';

// const plugin = new monoDjembe(ac as BaseAudioContext, './static/wasm');
// let node: AudioWorkletNode;

export function Test() {
	
	// useEffect(() => {
	// 	loadFaustPlugin()
	// 	// setTimeout(loadFaustPlugin, 1000)
	// }, [])
	
	// function loadFaustPlugin() {	
	// 	plugin.load().then((n: AudioWorkletNode) => {
	// 		node = n;
	// 		node.connect(ac.destination);
	// 	}).catch(e => console.log(e));
	// }

	// function startAudio() {
	// 	ac.resume();
	// }
	
	// function playNote() {
	// 	if (!node) return
	// 	node.parameters.get('/monoDjembe/gate')!.setValueAtTime(1, ac.currentTime + 1);
	// 	node.parameters.get('/monoDjembe/gate')!.setValueAtTime(0, ac.currentTime + 1.005);
	// }

	return (
		<div className="Screen TestScreen">
			<header>test page</header>
			<div className="content">
				{/* <button onClick={loadFaustPlugin}>load Faust plugin</button>
				<button onClick={startAudio}>start audio</button>
				<button onClick={playNote}>play note</button> */}
			</div>
		</div>
	);
}
