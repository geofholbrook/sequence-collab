import * as Tone from 'tone';
import { MidiPitch } from '@musicenviro/base';
import { dbToGain } from 'tone';


function createBassSynth() {
    const bassSynth = new Tone.PolySynth().toDestination();
    bassSynth.set({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0,
            decay: 0.2,
            sustain: 0.2,
            release: 1,
        }
    });
    return bassSynth;
}

const bassSynth = createBassSynth();
const bassSynth2 = createBassSynth();

export function playBass(ac: AudioContext, time: number, pitch: MidiPitch = 36, volumeDb = 0) {
    // bassSynth.set({volume: volumeDb})
    bassSynth.triggerAttackRelease(Tone.Midi(pitch).toFrequency(), .1, time, dbToGain(volumeDb))
}

export function playBass2(ac: AudioContext, time: number, pitch: MidiPitch = 36, volumeDb = 0) {
    // bassSynth2.set({volume: volumeDb})
    bassSynth2.triggerAttackRelease(Tone.Midi(pitch + 12).toFrequency(), .1, time, dbToGain(volumeDb))
}








