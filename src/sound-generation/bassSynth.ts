import * as Tone from 'tone';

const bassSynth = new Tone.PolySynth().toMaster()

export function playBass(ac: AudioContext, time: number) {
    bassSynth.triggerAttackRelease(60, 1, time)
}






