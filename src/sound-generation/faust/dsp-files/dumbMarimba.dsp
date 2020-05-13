import("stdfaust.lib");

freq = nentry("freq", 100, 10, 10000, 1);
gain = nentry("gain", 1, 0, 1, .01);

process =  pm.marimba(freq / 2, 1, 7000, 0.25, gain, button("gate"));
			