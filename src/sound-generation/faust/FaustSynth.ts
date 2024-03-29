import { Seconds } from '../../@types';
import { MidiPitch } from '@musicenviro/base';

import * as Tone from 'tone';

type PluginClassType = { new (ac: AudioContext, url: string): Plugin};

type Plugin = {
    load(): Promise<AudioWorkletNode>;
}
    
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

