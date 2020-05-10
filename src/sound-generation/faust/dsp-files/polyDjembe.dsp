import("stdfaust.lib");

freq = nentry("freq", 440, 440, 440, 1);
gain = nentry("gain", 1, 1, 1, 1);
process = button("gate") : pm.djembe(freq, .1, .2, gain);		