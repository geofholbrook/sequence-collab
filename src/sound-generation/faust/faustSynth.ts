import { monoDjembe } from './monoDjembe';
import { Seconds } from '../../@types';
import { MidiPitch } from '@musicenviro/base';
import * as Tone from 'tone'

let faustNode: AudioWorkletNode;

export async function initFaustSynth(ac: AudioContext) {
	const plugin = new monoDjembe(ac, './static/wasm');
	faustNode = await plugin.load();
	faustNode.connect(ac.destination);
}

export function playFaustNote(ac: AudioContext, time: Seconds, pitch: MidiPitch, volumeDb: number) {

    if (!faustNode) {
        console.log(`faustNode = ${faustNode}`)
    } else {
        faustNode.parameters.get('/monoDjembe/freq')!.setValueAtTime(Tone.Midi(pitch).toFrequency(), time);
        faustNode.parameters.get('/monoDjembe/gain')!.setValueAtTime(Tone.dbToGain(volumeDb), time);
        
        // make a gate blip at the requested audiocontext time
        faustNode.parameters.get('/monoDjembe/gate')!.setValueAtTime(1, time);
		faustNode.parameters.get('/monoDjembe/gate')!.setValueAtTime(0, time + 0.005);
    }
}