import { dbToGain } from "tone";


const kickVolume = 0.6
const snareVolume = 0.6
const hihatVolume = 0.4

export function kick(audioContext: AudioContext, start: number, volumeDb: number = 0) {
    const gain = dbToGain(volumeDb)

    var osc = audioContext.createOscillator();
    var osc2 = audioContext.createOscillator();
    var gainOsc = audioContext.createGain();
    var gainOsc2 = audioContext.createGain();

    osc.type = "triangle";
    osc2.type = "sine";

    gainOsc.gain.setValueAtTime(kickVolume * gain, start);
    gainOsc.gain.exponentialRampToValueAtTime(0.001 * gain, start + 0.5);
    
    gainOsc2.gain.setValueAtTime(kickVolume * gain, start);
    gainOsc2.gain.exponentialRampToValueAtTime(0.001 * gain, start + 0.5);
  

    osc.frequency.setValueAtTime(120, start);
    osc.frequency.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc2.frequency.setValueAtTime(50, start);
    osc2.frequency.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc.connect(gainOsc);
    osc2.connect(gainOsc2);
    gainOsc2.connect(audioContext.destination);
    gainOsc.connect(audioContext.destination);
    gainOsc.connect(audioContext.destination);
    gainOsc2.connect(audioContext.destination);

    osc.start(start);
    osc2.start(start);

    osc.stop(start + 0.5);
    osc2.stop(start + 0.5);

};

export function snare(audioContext: AudioContext, start: number, volumeDb: number = 0) {
    const gain = dbToGain(volumeDb)

    var osc3 = audioContext.createOscillator();
    var gainOsc3 = audioContext.createGain();

    var filterGain = audioContext.createGain();

    filterGain.gain.setValueAtTime(snareVolume * gain, start);
    filterGain.gain.exponentialRampToValueAtTime(0.01 * gain, start + 0.2);

    osc3.type = "triangle";
    osc3.frequency.value = 100;
    gainOsc3.gain.value = 0;

    gainOsc3.gain.setValueAtTime(0, start);
    gainOsc3.gain.exponentialRampToValueAtTime(0.01 * gain, start + 0.1);

    osc3.connect(gainOsc3);
    gainOsc3.connect(audioContext.destination);

    osc3.start(start);
    osc3.stop(start + 0.2);

    var node = audioContext.createBufferSource(),
        buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
        data = buffer.getChannelData(0);

    var filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(100, start);
    filter.frequency.linearRampToValueAtTime(1000, start + 0.2);


    for (var i = 0; i < 4096; i++) {
        data[i] = Math.random();
    }
    node.buffer = buffer;
    node.loop = true;
    node.connect(filter);
    filter.connect(filterGain);
    filterGain.connect(audioContext.destination);
    node.start(start);
    node.stop(start + 0.2);

};


export function hihat(audioContext: AudioContext, start: number, volumeDb: number = 0) {
    const gain = dbToGain(volumeDb)
    
    var gainOsc4 = audioContext.createGain();
    var fundamental = 40;
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    var bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    var highpass = audioContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;


    ratios.forEach(function(ratio) {

        var osc4 = audioContext.createOscillator();
        osc4.type = "square";
        osc4.frequency.value = fundamental * ratio;
        osc4.connect(bandpass);

        osc4.start(start);
        osc4.stop(start + 0.05);
        
    });

    gainOsc4.gain.setValueAtTime(hihatVolume * gain, start);
    gainOsc4.gain.exponentialRampToValueAtTime(0.01 * gain, start + 0.05);
    
    bandpass.connect(highpass);
    highpass.connect(gainOsc4);
    gainOsc4.connect(audioContext.destination);
};