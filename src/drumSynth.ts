




export function kick(audioContext: AudioContext, start: number) {
    const osc = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainOsc = audioContext.createGain();
    const gainOsc2 = audioContext.createGain();

    osc.type = "triangle";
    osc2.type = "sine";

    gainOsc.gain.setValueAtTime(1, start);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

    gainOsc2.gain.setValueAtTime(1, start);
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
   
    osc.frequency.setValueAtTime(120, start);
    osc.frequency.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc2.frequency.setValueAtTime(50, start);
    osc2.frequency.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc.connect(gainOsc);
    osc2.connect(gainOsc2);
    gainOsc.connect(audioContext.destination);
    gainOsc2.connect(audioContext.destination);

    osc.start(start);
    osc2.start(start);

    osc.stop(start + 0.5);
    osc2.stop(start + 0.5);
};