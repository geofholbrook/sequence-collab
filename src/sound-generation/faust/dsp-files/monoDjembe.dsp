import("stdfaust.lib");

freq = nentry("freq", 100, 10, 10000, 1);
gain = nentry("gain", 1, 0, 1, .01);

// process = os.triangle(freq) * 0.1 * gain * (button("gate") : (en.ar(0.01, 2) ^ 10));
process = button("gate") : pm.djembe(freq, .25, .25, gain);