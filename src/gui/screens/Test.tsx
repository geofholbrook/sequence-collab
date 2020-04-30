import React, { useEffect } from 'react';
import './Test.css';
import * as Tone from 'tone';
import { callSynth, noteSynths } from '../../sound-generation/synths';
import { Seconds } from '../../@types';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

let ac = Tone.context.rawContext as AudioContext;

export interface ISynth {
	name: string;
	fn: (ac: AudioContext, start: Seconds, ...args: any[]) => void;
	args?: any[];
}

export function Test() {
	return (
		<div className="Screen TestScreen">
			<header>test page</header>
			<div className="content">
				{/* <NoteSynthButtons /> */}

				<Provider store={store}>
					<MountieConnected />
				</Provider>
			</div>
		</div>
	);
}

function NoteSynthButtons() {
	return (
		<div>
			{noteSynths.map((synth) => (
				<button key={synth.name} onClick={(e) => callSynth(ac, synth)} unselectable="on">
					{synth.name}
				</button>
			))}
		</div>
	);
}

interface IState {
	foo: number;
	bar: number;
}

interface IAction {
	type: 'SET_FOO' | 'SET_BAR';
	value: number;
}

const initialState = {
	foo: 1,
	bar: 2,
};

function reducer(state: IState | undefined, action: IAction) {
	if (!state) return initialState;
	switch (action.type) {
		case 'SET_FOO':
			return {
				...state,
				foo: action.value,
			};

		case 'SET_BAR':
			return {
				...state,
				bar: action.value,
			};

		default:
			return state;
	}
}

const store = createStore<IState, IAction, unknown, unknown>(reducer, initialState);

let counter = 3;
setInterval(() => store.dispatch({type: 'SET_BAR', value: counter++}), 1000)


const MountieConnected = connect((state: IState) => ({
	foo: state.foo,
	bar: state.bar
}))(Mountie)


function Mountie(props: { foo: number; bar: number }) {
	useEffect(() => {
		console.log('Mountie mounting');
	}, []);

	return (
		<div>
			foo is {props.foo}
			<BarDisplay bar={props.bar} />
		</div>
	);
}



function BarDisplay(props: { bar: number }) {

	useEffect(() => {
		console.log('BarDisplay mounting');
	}, []);

	return <div>bar is {props.bar}</div>;

}
