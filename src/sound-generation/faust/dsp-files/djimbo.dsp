import("stdfaust.lib");

tempo = nentry("/beat/tempo", 180, 40, 200, 1);

process = ba.beat(tempo) : pm.djembe(os.osc(.1) * 100 + 500, .1, .2, .1);		