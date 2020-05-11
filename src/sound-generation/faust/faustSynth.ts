import { Seconds } from '../../@types';
import { MidiPitch } from '@musicenviro/base';

import * as Tone from 'tone';

type PluginClassType = { new (ac: AudioContext, url: string): Plugin};

type Plugin = {
    load(): Promise<AudioWorkletNode>;
}
    

/*
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
*/


export class FaustSynth {
    moduleName: string;
	PluginClass: PluginClassType;
	plugin: Plugin | undefined;
	node: AudioWorkletNode | undefined;

	constructor(PluginClass: PluginClassType, moduleName: string) {
        this.PluginClass = PluginClass;
        this.moduleName = moduleName;
	}

	async init(ac: AudioContext) {
		this.plugin = new this.PluginClass(ac, './static/wasm');
        this.node = await this.plugin.load();
        if (!this.node) {
            throw new Error('plugin load failed')
        }
		this.node.connect(ac.destination);
	}

    playNote(ac: AudioContext, time: Seconds, pitch: MidiPitch, volumeDb: number) {
        if (!this.node) {
            console.log(`this.node = ${this.node}`);
        } else {
            this.node.parameters
                .get(`/${this.moduleName}/freq`)!
                .setValueAtTime(Tone.Midi(pitch).toFrequency(), time);
            this.node.parameters.get(`/${this.moduleName}/gain`)!.setValueAtTime(Tone.dbToGain(volumeDb), time);
    
            // make a gate blip at the requested audiocontext time
            this.node.parameters.get(`/${this.moduleName}/gate`)!.setValueAtTime(1, time);
            this.node.parameters.get(`/${this.moduleName}/gate`)!.setValueAtTime(0, time + 0.005);
        }
    }
}

