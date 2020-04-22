import * as Tone from 'tone';
import { MidiPitch } from '@musicenviro/base';

const bassSynth = new Tone.PolySynth().toMaster()

bassSynth.set({
    oscillator: {
        type: "triangle"
    },
    envelope: {
        attack: 0,
        decay: 0.2,
        sustain: 0.2,
        release: 0.5,
    }
})

export function playBass(ac: AudioContext, time: number, pitch: MidiPitch = 36) {
    bassSynth.triggerAttackRelease(Tone.Midi(pitch).toFrequency(), .1, time)
}






