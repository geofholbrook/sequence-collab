import { FaustSynth } from './FaustSynth';
import { ISynth } from '../../@types';

import { faustModuleNames } from './faustModuleNames';

// these live here, for now.
const faustSynths = faustModuleNames.map(name => new FaustSynth(require(`./workletnodes/${name}`)[name], name))

export function getFaustSynths(): ISynth[] {
	return faustSynths.map((faustSynth) => ({
		name: faustSynth.moduleName,
		init: (ac) => faustSynth.init(ac),
		fn: (ac, time, pitch, volumeDb) => faustSynth.playNote(ac, time, pitch, volumeDb),
	}));
}

