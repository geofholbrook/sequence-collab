
/*
Code generated with Faust version 2.23.6
Compilation options: -lang wasm-eb -scal -ftz 2
*/

function getJSONpolyDjembe() {
	return '{"name": "polyDjembe","filename": "polyDjembe.dsp","version": "2.23.6","compile_options": "-lang wasm-eb -scal -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/physmodels.lib","/usr/local/share/faust/noises.lib","/usr/local/share/faust/filters.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/usr/local/share/faust/envelopes.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust","./src/sound-generation/faust/dsp-files","/Users/geof/Data/programming/music-enviro/sequence-collab/./src/sound-generation/faust/dsp-files"],"size": 608,"inputs": 0,"outputs": 1,"meta": [ { "envelopes.lib/ar:author": "Yann Orlarey, Stéphane Letz" },{ "envelopes.lib/author": "GRAME" },{ "envelopes.lib/copyright": "GRAME" },{ "envelopes.lib/license": "LGPL with exception" },{ "envelopes.lib/name": "Faust Envelope Library" },{ "envelopes.lib/version": "0.1" },{ "filename": "polyDjembe.dsp" },{ "filters.lib/fir:author": "Julius O. Smith III" },{ "filters.lib/fir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/fir:license": "MIT-style STK-4.3 license" },{ "filters.lib/highpass:author": "Julius O. Smith III" },{ "filters.lib/highpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:author": "Julius O. Smith III" },{ "filters.lib/iir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:license": "MIT-style STK-4.3 license" },{ "filters.lib/lowpass0_highpass1": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass0_highpass1:author": "Julius O. Smith III" },{ "filters.lib/lowpass:author": "Julius O. Smith III" },{ "filters.lib/lowpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass:license": "MIT-style STK-4.3 license" },{ "filters.lib/name": "Faust Filters Library" },{ "filters.lib/tf2:author": "Julius O. Smith III" },{ "filters.lib/tf2:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2:license": "MIT-style STK-4.3 license" },{ "filters.lib/tf2s:author": "Julius O. Smith III" },{ "filters.lib/tf2s:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2s:license": "MIT-style STK-4.3 license" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.2" },{ "name": "polyDjembe" },{ "noises.lib/name": "Faust Noise Generator Library" },{ "noises.lib/version": "0.0" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" }],"ui": [ {"type": "vgroup","label": "polyDjembe","items": [ {"type": "nentry","label": "freq","address": "/polyDjembe/freq","index": 132,"init": 440,"min": 440,"max": 440,"step": 1},{"type": "nentry","label": "gain","address": "/polyDjembe/gain","index": 20,"init": 1,"min": 1,"max": 1,"step": 1},{"type": "button","label": "gate","address": "/polyDjembe/gate","index": 100}]}]}';
}
function getBase64CodepolyDjembe() { return "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QZQEaioCAJOUkkOIRUo7IABBpARqKgIAIABBrARqKgIAk5SSQ0iKNTsgAEG8BGoqAgAgAEHEBGoqAgCTlJJDCtcjOyAAQdQEaioCACAAQdwEaioCAJOUkiAAQZQBaioCAJOUOAIAIABBMGogAEEsaigCADYCACAAQcQAaiAAQcAAaioCADgCACAAQcAAaiAAQTxqKgIAOAIAIABB3ABqIABB2ABqKgIAOAIAIABB2ABqIABB1ABqKgIAOAIAIABB7ABqIABB6ABqKgIAOAIAIABB9ABqIABB8ABqKAIANgIAIABBlAFqIABBkAFqKgIAOAIAIABBkAFqIABBjAFqKgIAOAIAIABBrAFqIABBqAFqKgIAOAIAIABBqAFqIABBpAFqKgIAOAIAIABBxAFqIABBwAFqKgIAOAIAIABBwAFqIABBvAFqKgIAOAIAIABB3AFqIABB2AFqKgIAOAIAIABB2AFqIABB1AFqKgIAOAIAIABB9AFqIABB8AFqKgIAOAIAIABB8AFqIABB7AFqKgIAOAIAIABBjAJqIABBiAJqKgIAOAIAIABBiAJqIABBhAJqKgIAOAIAIABBpAJqIABBoAJqKgIAOAIAIABBoAJqIABBnAJqKgIAOAIAIABBvAJqIABBuAJqKgIAOAIAIABBuAJqIABBtAJqKgIAOAIAIABB1AJqIABB0AJqKgIAOAIAIABB0AJqIABBzAJqKgIAOAIAIABB7AJqIABB6AJqKgIAOAIAIABB6AJqIABB5AJqKgIAOAIAIABBhANqIABBgANqKgIAOAIAIABBgANqIABB/AJqKgIAOAIAIABBnANqIABBmANqKgIAOAIAIABBmANqIABBlANqKgIAOAIAIABBtANqIABBsANqKgIAOAIAIABBsANqIABBrANqKgIAOAIAIABBzANqIABByANqKgIAOAIAIABByANqIABBxANqKgIAOAIAIABB5ANqIABB4ANqKgIAOAIAIABB4ANqIABB3ANqKgIAOAIAIABB/ANqIABB+ANqKgIAOAIAIABB+ANqIABB9ANqKgIAOAIAIABBlARqIABBkARqKgIAOAIAIABBkARqIABBjARqKgIAOAIAIABBrARqIABBqARqKgIAOAIAIABBqARqIABBpARqKgIAOAIAIABBxARqIABBwARqKgIAOAIAIABBwARqIABB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QQRqKgIAlRABOAIAIABBzARqQwAAAABDAAAAQCAAQcgEaioCAJSTOAIAIABB0ARqIABByARqKgIAQwAAAEAQATgCAAuQgICAAAAgACABEAsgABANIAAQCgurgICAAAAgAEEUakMAAIA/OAIAIABB5ABqQwAAAAA4AgAgAEGEAWpDAADcQzgCAAuQgICAAAAgACABSAR/IAEFIAALDwuQgICAAAAgACABSAR/IAAFIAELDwuMgICAAAAgACABaiACOAIACwu6mYCAAAEAQQALsxl7Im5hbWUiOiAicG9seURqZW1iZSIsImZpbGVuYW1lIjogInBvbHlEamVtYmUuZHNwIiwidmVyc2lvbiI6ICIyLjIzLjYiLCJjb21waWxlX29wdGlvbnMiOiAiLWxhbmcgd2FzbS1lYiAtc2NhbCAtZnR6IDIiLCJsaWJyYXJ5X2xpc3QiOiBbIi91c3IvbG9jYWwvc2hhcmUvZmF1c3Qvc3RkZmF1c3QubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9waHlzbW9kZWxzLmxpYiIsIi91c3IvbG9jYWwvc2hhcmUvZmF1c3Qvbm9pc2VzLmxpYiIsIi91c3IvbG9jYWwvc2hhcmUvZmF1c3QvZmlsdGVycy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L21hdGhzLmxpYiIsIi91c3IvbG9jYWwvc2hhcmUvZmF1c3QvcGxhdGZvcm0ubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9lbnZlbG9wZXMubGliIl0sImluY2x1ZGVfcGF0aG5hbWVzIjogWyIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3Ivc2hhcmUvZmF1c3QiLCIuL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyIsIi9Vc2Vycy9nZW9mL0RhdGEvcHJvZ3JhbW1pbmcvbXVzaWMtZW52aXJvL3NlcXVlbmNlLWNvbGxhYi8uL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyJdLCJzaXplIjogNjA4LCJpbnB1dHMiOiAwLCJvdXRwdXRzIjogMSwibWV0YSI6IFsgeyAiZW52ZWxvcGVzLmxpYi9hcjphdXRob3IiOiAiWWFubiBPcmxhcmV5LCBTdMOpcGhhbmUgTGV0eiIgfSx7ICJlbnZlbG9wZXMubGliL2F1dGhvciI6ICJHUkFNRSIgfSx7ICJlbnZlbG9wZXMubGliL2NvcHlyaWdodCI6ICJHUkFNRSIgfSx7ICJlbnZlbG9wZXMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJlbnZlbG9wZXMubGliL25hbWUiOiAiRmF1c3QgRW52ZWxvcGUgTGlicmFyeSIgfSx7ICJlbnZlbG9wZXMubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImZpbGVuYW1lIjogInBvbHlEamVtYmUuZHNwIiB9LHsgImZpbHRlcnMubGliL2ZpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9maXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2ZpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6YXV0aG9yIjogIkp1bGl1cyBPLiBTbWl0aCBJSUkiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9paXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvbG93cGFzczBfaGlnaHBhc3MxIjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3MwX2hpZ2hwYXNzMTphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9sb3dwYXNzOmF1dGhvciI6ICJKdWxpdXMgTy4gU21pdGggSUlJIiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6bGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImZpbHRlcnMubGliL25hbWUiOiAiRmF1c3QgRmlsdGVycyBMaWJyYXJ5IiB9LHsgImZpbHRlcnMubGliL3RmMjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL3RmMjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvdGYyczphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMDMtMjAxOSBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmxpY2Vuc2UiOiAiTUlULXN0eWxlIFNUSy00LjMgbGljZW5zZSIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi4yIiB9LHsgIm5hbWUiOiAicG9seURqZW1iZSIgfSx7ICJub2lzZXMubGliL25hbWUiOiAiRmF1c3QgTm9pc2UgR2VuZXJhdG9yIExpYnJhcnkiIH0seyAibm9pc2VzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJwbGF0Zm9ybS5saWIvbmFtZSI6ICJHZW5lcmljIFBsYXRmb3JtIExpYnJhcnkiIH0seyAicGxhdGZvcm0ubGliL3ZlcnNpb24iOiAiMC4xIiB9XSwidWkiOiBbIHsidHlwZSI6ICJ2Z3JvdXAiLCJsYWJlbCI6ICJwb2x5RGplbWJlIiwiaXRlbXMiOiBbIHsidHlwZSI6ICJuZW50cnkiLCJsYWJlbCI6ICJmcmVxIiwiYWRkcmVzcyI6ICIvcG9seURqZW1iZS9mcmVxIiwiaW5kZXgiOiAxMzIsImluaXQiOiA0NDAsIm1pbiI6IDQ0MCwibWF4IjogNDQwLCJzdGVwIjogMX0seyJ0eXBlIjogIm5lbnRyeSIsImxhYmVsIjogImdhaW4iLCJhZGRyZXNzIjogIi9wb2x5RGplbWJlL2dhaW4iLCJpbmRleCI6IDIwLCJpbml0IjogMSwibWluIjogMSwibWF4IjogMSwic3RlcCI6IDF9LHsidHlwZSI6ICJidXR0b24iLCJsYWJlbCI6ICJnYXRlIiwiYWRkcmVzcyI6ICIvcG9seURqZW1iZS9nYXRlIiwiaW5kZXgiOiAxMDB9XX1dfQ=="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

function getBase64Mixer() { return "AGFzbQEAAAABj4CAgAACYAN/f38AYAR/f39/AX0CkoCAgAABBm1lbW9yeQZtZW1vcnkCAAIDg4CAgAACAAEHmoCAgAACC2NsZWFyT3V0cHV0AAAIbWl4Vm9pY2UAAQqKgoCAAALigICAAAEDfwJAQQAhBQNAAkAgAiAFQQJ0aigCACEDQQAhBANAAkAgAyAEQQJ0akMAAAAAOAIAIARBAWohBCAEIABIBEAMAgUMAQsACwsgBUEBaiEFIAUgAUgEQAwCBQwBCwALCwsLnYGAgAACBH8DfQJ9QQAhB0MAAAAAIQgDQAJAQQAhBiACIAdBAnRqKAIAIQQgAyAHQQJ0aigCACEFA0ACQCAEIAZBAnRqKgIAIQkgCCAJi5chCCAFIAZBAnRqKgIAIQogBSAGQQJ0aiAKIAmSOAIAIAZBAWohBiAGIABIBEAMAgUMAQsACwsgB0EBaiEHIAcgAUgEQAwCBQwBCwALCyAIDwsL"; }

// Polyphonic Faust DSP
class polyDjembePolyProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
           	polyDjembePolyProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            polyDjembePolyProcessor.parse_items(group.items, obj, callback);
        }
    }
    
    static parse_items(items, obj, callback)
    {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], obj, callback);
        }
    }
    
    static parse_item1(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            polyDjembePolyProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Nothing
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            obj.push({ name: item.address,
                     defaultValue: item.init,
                     minValue: item.min,
                     maxValue: item.max });
        }
    }
    
    static parse_item2(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            polyDjembePolyProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
            if (item.meta !== undefined) {
                for (var i = 0; i < item.meta.length; i++) {
                    if (item.meta[i].midi !== undefined) {
                        if (item.meta[i].midi.trim() === "pitchwheel") {
                            obj.fPitchwheelLabel.push({ path:item.address,
                                  min:parseFloat(item.min),
                                  max:parseFloat(item.max) });
                        } else if (item.meta[i].midi.trim().split(" ")[0] === "ctrl") {
                            obj.fCtrlLabel[parseInt(item.meta[i].midi.trim().split(" ")[1])]
                            .push({ path:item.address,
                                  min:parseFloat(item.min),
                                  max:parseFloat(item.max) });
                        }
                    }
                }
            }
        }
    }
    
    static b64ToUint6(nChr)
    {
        return nChr > 64 && nChr < 91 ?
        nChr - 65
        : nChr > 96 && nChr < 123 ?
        nChr - 71
        : nChr > 47 && nChr < 58 ?
        nChr + 4
        : nChr === 43 ?
        62
        : nChr === 47 ?
        63
        :
        0;
    }
    
    static atob(sBase64, nBlocksSize)
    {
        if (typeof atob === 'function') {
            return atob(sBase64);
        } else {
            
            var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, "");
            var nInLen = sB64Enc.length;
            var nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2;
            var taBytes = new Uint8Array(nOutLen);
            
            for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                nMod4 = nInIdx & 3;
                nUint24 |= polyDjembePolyProcessor.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                if (nMod4 === 3 || nInLen - nInIdx === 1) {
                    for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                    }
                    nUint24 = 0;
                }
            }
            return taBytes.buffer;
        }
    }
    
    static remap(v, mn0, mx0, mn1, mx1)
    {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }

    static get parameterDescriptors() 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        
        // Add instrument parameters
        polyDjembePolyProcessor.parse_ui(JSON.parse(getJSONpolyDjembe()).ui, params, polyDjembePolyProcessor.parse_item1);
        
        // Possibly add effect parameters
        if (typeof (getJSONeffect) !== "undefined") {
             polyDjembePolyProcessor.parse_ui(JSON.parse(getJSONeffect()).ui, params, polyDjembePolyProcessor.parse_item1);
        }
        return params;
    }
    
    static createMemory(buffer_size, polyphony) 
    {
        // Memory allocator
        var ptr_size = 4;
        var sample_size = 4;
        
        function pow2limit(x)
        {
            var n = 65536; // Minimum = 64 kB
            while (n < x) { n = 2 * n; }
            return n;
        }
        
        var json_object = null;
        try {
            json_object = JSON.parse(getJSONpolyDjembe());
        } catch (e) {
            return null;
        }
        
        var effect_json_object_size = 0;
        if (typeof (getJSONeffect) !== "undefined") {
            var effect_json_object = null;
            try {
                effect_json_object = JSON.parse(getJSONeffect());
                effect_json_object_size = parseInt(effect_json_object.size);
            } catch (e) {
                faust.error_msg = "Error in JSON.parse: " + e;
                return null;
            }
        }
        
        var memory_size = pow2limit(effect_json_object_size + parseInt(json_object.size) * polyphony + ((parseInt(json_object.inputs) + parseInt(json_object.outputs) * 2) * (ptr_size + (buffer_size * sample_size)))) / 65536;
        memory_size = Math.max(2, memory_size); // As least 2
        return new WebAssembly.Memory({ initial: memory_size, maximum: memory_size });
    }
    
    constructor(options)
    {
        super(options);
        this.running = true;
        
        this.json_object = JSON.parse(getJSONpolyDjembe());
        if (typeof (getJSONeffect) !== "undefined") {
            this.effect_json_object = JSON.parse(getJSONeffect());
        }
        
        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.debug = false;
        
        this.ins = null;
        this.outs = null;
        this.mixing = null;
        this.compute_handler = null;
        
        this.dspInChannnels = [];
        this.dspOutChannnels = [];
        
        this.fFreqLabel = [];
        this.fGateLabel = [];
        this.fGainLabel = [];
        this.fDate = 0;
        
        this.fPitchwheelLabel = [];
        this.fCtrlLabel = new Array(128);
        for (var i = 0; i < this.fCtrlLabel.length; i++) { this.fCtrlLabel[i] = []; }
   
        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);
        
        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
         
        var wasm_memory = polyDjembePolyProcessor.createMemory(polyDjembePolyProcessor.buffer_size, options.processorOptions.polyphony);

        // Create Mixer
        this.mixerObject = { imports: { print: arg => console.log(arg) } }
        this.mixerObject["memory"] = { "memory": wasm_memory };

        this.importObject = {
            env: {
                memoryBase: 0,
                tableBase: 0,
                    
                // Integer version
                _abs: Math.abs,
                
                // Float version
                _acosf: Math.acos,
                _asinf: Math.asin,
                _atanf: Math.atan,
                _atan2f: Math.atan2,
                _ceilf: Math.ceil,
                _cosf: Math.cos,
                _expf: Math.exp,
                _floorf: Math.floor,
                _fmodf: function(x, y) { return x % y; },
                _logf: Math.log,
                _log10f: Math.log10,
                _max_f: Math.max,
                _min_f: Math.min,
                _remainderf: function(x, y) { return x - Math.round(x/y) * y; },
                _powf: Math.pow,
                _roundf: Math.fround,
                _sinf: Math.sin,
                _sqrtf: Math.sqrt,
                _tanf: Math.tan,
                _acoshf: Math.acosh,
                _asinhf: Math.asinh,
                _atanhf: Math.atanh,
                _coshf: Math.cosh,
                _sinhf: Math.sinh,
                _tanhf: Math.tanh,
                   
                // Double version
                _acos: Math.acos,
                _asin: Math.asin,
                _atan: Math.atan,
                _atan2: Math.atan2,
                _ceil: Math.ceil,
                _cos: Math.cos,
                _exp: Math.exp,
                _floor: Math.floor,
                _fmod: function(x, y) { return x % y; },
                _log: Math.log,
                _log10: Math.log10,
                _max_: Math.max,
                _min_: Math.min,
                _remainder:function(x, y) { return x - Math.round(x/y) * y; },
                _pow: Math.pow,
                _round: Math.fround,
                _sin: Math.sin,
                _sqrt: Math.sqrt,
                _tan: Math.tan,
                _acosh: Math.acosh,
                _asinh: Math.asinh,
                _atanh: Math.atanh,
                _cosh: Math.cosh,
                _sinh: Math.sinh,
                _tanh: Math.tanh,
                
                memory: wasm_memory,
                
                table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
            }
        }

        // wasm mixer
        this.mixer = new WebAssembly.Instance(polyDjembePolyProcessor.wasm_mixer_module, this.mixerObject).exports;

        // wasm instance
        this.factory = new WebAssembly.Instance(polyDjembePolyProcessor.wasm_module, this.importObject).exports;
        
        // wasm effect
        this.effect = (polyDjembePolyProcessor.wasm_effect_module) ? new WebAssembly.Instance(polyDjembePolyProcessor.wasm_effect_module, this.importObject).exports : null;
        
        this.HEAP = wasm_memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);
        
        // Warning: keeps a ref on HEAP in Chrome and prevent proper GC
        //console.log(this.HEAP);
        //console.log(this.HEAP32);
        //console.log(this.HEAPF32);
        
        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];
        
        // input items
        this.inputs_items = [];
        
        // Start of HEAP index
        this.audio_heap_ptr = 0; // Fails when 0...
        
        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);
        this.audio_heap_ptr_mixing = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        
        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_mixing + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * polyDjembePolyProcessor.buffer_size * this.sample_size);
        this.audio_heap_mixing = this.audio_heap_outputs + (this.numOut * polyDjembePolyProcessor.buffer_size * this.sample_size);
        
        // Setup DSP voices offset
        this.dsp_start = this.audio_heap_mixing + (this.numOut * polyDjembePolyProcessor.buffer_size * this.sample_size);
        
        if (this.debug) {
            console.log(this.mixer);
            console.log(this.factory);
            console.log(this.effect);
        }
        
        // Start of DSP memory ('polyphony' DSP voices)
        this.polyphony = options.processorOptions.polyphony;
        this.dsp_voices = [];
        this.dsp_voices_state = [];
        this.dsp_voices_level = [];
        this.dsp_voices_date = [];
        
        this.kActiveVoice = 0;
        this.kFreeVoice = -1;
        this.kReleaseVoice = -2;
        this.kNoVoice = -3;
     
        this.pathTable = [];
        
        // Allocate table for 'setParamValue'
        this.value_table = [];
        
        for (var i = 0; i < this.polyphony; i++) {
            this.dsp_voices[i] = this.dsp_start + i * parseInt(this.json_object.size);
            this.dsp_voices_state[i] = this.kFreeVoice;
            this.dsp_voices_level[i] = 0;
            this.dsp_voices_date[i] = 0;
        }
        
        // Effect memory starts after last voice
        this.effect_start = this.dsp_voices[this.polyphony - 1] + parseInt(this.json_object.size);
        
        this.printMemory = function ()
        {
            console.log("============== Memory layout ==============");
            console.log("json_object.size: " + this.json_object.size);
            
            console.log("audio_heap_ptr: " + this.audio_heap_ptr);
            
            console.log("audio_heap_ptr_inputs: " + this.audio_heap_ptr_inputs);
            console.log("audio_heap_ptr_outputs: " + this.audio_heap_ptr_outputs);
            console.log("audio_heap_ptr_mixing: " + this.audio_heap_ptr_mixing);
            
            console.log("audio_heap_inputs: " + this.audio_heap_inputs);
            console.log("audio_heap_outputs: " + this.audio_heap_outputs);
            console.log("audio_heap_mixing: " + this.audio_heap_mixing);
            
            console.log("dsp_start: " + this.dsp_start);
            for (var i = 0; i <  this.polyphony; i++) {
                console.log("dsp_voices[i]: " + i + " " + this.dsp_voices[i]);
            }
            console.log("effect_start: " + this.effect_start);
        }
    
        this.getPlayingVoice = function(pitch)
        {
            var voice_playing = this.kNoVoice;
            var oldest_date_playing = Number.MAX_VALUE;
            
            for (var i = 0; i <  this.polyphony; i++) {
                if (this.dsp_voices_state[i] === pitch) {
                    // Keeps oldest playing voice
                    if (this.dsp_voices_date[i] < oldest_date_playing) {
                        oldest_date_playing = this.dsp_voices_date[i];
                        voice_playing = i;
                    }
                }
            }
            
            return voice_playing;
        }
        
        // Always returns a voice
        this.allocVoice = function(voice)
        {
            // so that envelop is always re-initialized
            this.factory.instanceClear(this.dsp_voices[voice]);
            this.dsp_voices_date[voice] = this.fDate++;
            this.dsp_voices_state[voice] = this.kActiveVoice;
            return voice;
        }
        
        this.getFreeVoice = function()
        {
            for (var i = 0; i <  this.polyphony; i++) {
                if (this.dsp_voices_state[i] === this.kFreeVoice) {
                    return this.allocVoice(i);
                }
            }
            
            var voice_release = this.kNoVoice;
            var voice_playing = this.kNoVoice;
            var oldest_date_release = Number.MAX_VALUE;
            var oldest_date_playing = Number.MAX_VALUE;
            
            // Scan all voices
            for (var i = 0; i <  this.polyphony; i++) {
                // Try to steal a voice in kReleaseVoice mode...
                if (this.dsp_voices_state[i] === this.kReleaseVoice) {
                    // Keeps oldest release voice
                    if (this.dsp_voices_date[i] < oldest_date_release) {
                        oldest_date_release = this.dsp_voices_date[i];
                        voice_release = i;
                    }
                } else {
                    if (this.dsp_voices_date[i] < oldest_date_playing) {
                        oldest_date_playing = this.dsp_voices_date[i];
                        voice_playing = i;
                    }
                }
            }
            
            // Then decide which one to steal
            if (oldest_date_release != Number.MAX_VALUE) {
                if (this.debug) {
                    console.log("Steal release voice : voice_date = %d cur_date = %d voice = %d", this.dsp_voices_date[voice_release], this.fDate, voice_release);
                }
                return this.allocVoice(voice_release);
            } else if (oldest_date_playing != Number.MAX_VALUE) {
                if (this.debug) {
                    console.log("Steal playing voice : voice_date = %d cur_date = %d voice = %d", this.dsp_voices_date[voice_playing], this.fDate, voice_playing);
                }
                return this.allocVoice(voice_playing);
            } else {
                return this.kNoVoice;
            }
        }
        
        this.update_outputs = function ()
        {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.factory.getParamValue(this.dsp, this.pathTable[this.outputs_items[i]]));
                }
            }
        }
        
        this.midiToFreq = function (note)
        {
            return 440.0 * Math.pow(2.0, (note - 69.0) / 12.0);
        }
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((polyDjembePolyProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + polyDjembePolyProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                // allocate memory for output and mixing arrays
                this.outs = this.audio_heap_ptr_outputs;
                this.mixing = this.audio_heap_ptr_mixing;
                
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((polyDjembePolyProcessor.buffer_size * this.sample_size) * i);
                    this.HEAP32[(this.mixing >> 2) + i] = this.audio_heap_mixing + ((polyDjembePolyProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + polyDjembePolyProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            // Parse UI part
            polyDjembePolyProcessor.parse_ui(this.json_object.ui, this, polyDjembePolyProcessor.parse_item2);
            
            if (this.effect) {
                polyDjembePolyProcessor.parse_ui(this.effect_json_object.ui, this, polyDjembePolyProcessor.parse_item2);
            }
     
            // keep 'keyOn/keyOff' labels
            for (i = 0; i < this.inputs_items.length; i++) {
                if (this.inputs_items[i].endsWith("/gate")) {
                    this.fGateLabel.push(this.pathTable[this.inputs_items[i]]);
                } else if (this.inputs_items[i].endsWith("/freq")) {
                    this.fFreqLabel.push(this.pathTable[this.inputs_items[i]]);
                } else if (this.inputs_items[i].endsWith("/gain")) {
                    this.fGainLabel.push(this.pathTable[this.inputs_items[i]]);
                }
            }
            
            // Init DSP voices
            for (i = 0; i < this.polyphony; i++) {
                this.factory.init(this.dsp_voices[i], sampleRate);  // 'sampleRate' is defined in AudioWorkletGlobalScope
            }
            
            // Init effect
            if (this.effect) {
                this.effect.init(this.effect_start, sampleRate);
            }
            
            // Print memory layout
            this.printMemory();
        }
        
        this.keyOn = function (channel, pitch, velocity)
        {
            var voice = this.getFreeVoice();
            if (this.debug) {
                console.log("keyOn voice %d", voice);
            }
            for (var i = 0; i < this.fFreqLabel.length; i++) {
                this.factory.setParamValue(this.dsp_voices[voice], this.fFreqLabel[i], this.midiToFreq(pitch));
            }
            for (var i = 0; i < this.fGateLabel.length; i++) {
                this.factory.setParamValue(this.dsp_voices[voice], this.fGateLabel[i], 1.0);
            }
            for (var i = 0; i < this.fGainLabel.length; i++) {
                this.factory.setParamValue(this.dsp_voices[voice], this.fGainLabel[i], velocity/127.);
            }
            this.dsp_voices_state[voice] = pitch;
        }
        
        this.keyOff = function (channel, pitch, velocity)
        {
            var voice = this.getPlayingVoice(pitch);
            if (voice !== this.kNoVoice) {
                if (this.debug) {
                    console.log("keyOff voice %d", voice);
                }
                // No use of velocity for now...
                for (var i = 0; i < this.fGateLabel.length; i++) {
                    this.factory.setParamValue(this.dsp_voices[voice], this.fGateLabel[i], 0.0);
                }
                // Release voice
                this.dsp_voices_state[voice] = this.kReleaseVoice;
            } else {
                if (this.debug) {
                    console.log("Playing voice not found...");
                }
            }
        }
        
        this.allNotesOff = function ()
        {
            for (var i = 0; i < this.polyphony; i++) {
                for (var j = 0; j < this.fGateLabel.length; j++) {
                    this.factory.setParamValue(this.dsp_voices[i], this.fGateLabel[j], 0.0);
                }
                this.dsp_voices_state[i] = this.kReleaseVoice;
            }
        }
        
        this.ctrlChange = function (channel, ctrl, value)
        {
            if (ctrl === 123 || ctrl === 120) {
                this.allNotesOff();
            }
            
            if (this.fCtrlLabel[ctrl] !== []) {
                for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                    var path = this.fCtrlLabel[ctrl][i].path;
                    this.setParamValue(path, polyDjembePolyProcessor.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
                    if (this.output_handler) {
                   		this.output_handler(path, this.getParamValue(path));
                   	}
                }
            }
        }
        
        this.pitchWheel = function (channel, wheel)
        {
            for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
                var pw = this.fPitchwheelLabel[i];
                this.setParamValue(pw.path, polyDjembePolyProcessor.remap(wheel, 0, 16383, pw.min, pw.max));
                if (this.output_handler) {
                   	this.output_handler(pw.path, this.getParamValue(pw.path));
                }
            }
        }
        
        this.setParamValue = function (path, val)
        {
            if (this.effect && getJSONeffect().includes(path)) {
                this.effect.setParamValue(this.effect_start, this.pathTable[path], val);
            } else {
                for (var i = 0; i < this.polyphony; i++) {
                    this.factory.setParamValue(this.dsp_voices[i], this.pathTable[path], val);
                }
            }
        }

        this.getParamValue = function (path)
        {
            if (this.effect && getJSONeffect().includes(path)) {
                return this.effect.getParamValue(this.effect_start, this.pathTable[path]);
            } else {
                return this.factory.getParamValue(this.dsp_voices[0], this.pathTable[path]);
            }
        }
            
        // Init resulting DSP
        this.initAux();
        
        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
    }
   
    handleMessage(event) 
    {
        var msg = event.data;
        switch (msg.type) {
            // Generic MIDI message
            case "midi": this.midiMessage(msg.data); break;
            // Typed MIDI message
            case "keyOn": this.keyOn(msg.data[0], msg.data[1], msg.data[2]); break;
            case "keyOff": this.keyOff(msg.data[0], msg.data[1], msg.data[2]); break;
            case "ctrlChange": this.ctrlChange(msg.data[0], msg.data[1], msg.data[2]); break;
            case "pitchWheel": this.pitchWheel(msg.data[0], msg.data[1]); break;
            // Generic data message
            case "param": this.setParamValue(msg.key, msg.value); break;
            //case "patch": this.onpatch(msg.data); break;
            case "destroy": this.running = false; break;
        }
    }
  	
    midiMessage(data)
    {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];

        if (channel === 9) {
            return;
        } else if (cmd === 8 || ((cmd === 9) && (data2 === 0))) {
            this.keyOff(channel, data1, data2);
        } else if (cmd === 9) {
            this.keyOn(channel, data1, data2);
        } else if (cmd === 11) {
            this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
            this.pitchWheel(channel, (data2 * 128.0 + data1));
        }
    }
    
    process(inputs, outputs, parameters) 
    {
        var input = inputs[0];
        var output = outputs[0];
        
        // Check inputs
        if (this.numIn > 0 && (!input || !input[0] || input[0].length === 0)) {
            //console.log("Process input error");
            return true;
        }
        // Check outputs
        if (this.numOut > 0 && (!output || !output[0] || output[0].length === 0)) {
            //console.log("Process output error");
            return true;
        }
        
        // Copy inputs
        if (input !== undefined) {
            for (var chan = 0; chan < Math.min(this.numIn, input.length); ++chan) {
                var dspInput = this.dspInChannnels[chan];
                dspInput.set(input[chan]);
            }
        }
       
        // Possibly call an externally given callback (for instance to synchronize playing a MIDIFile...)
        if (this.compute_handler) {
            this.compute_handler(polyDjembePolyProcessor.buffer_size);
        }
         
        // First clear the outputs
        this.mixer.clearOutput(polyDjembePolyProcessor.buffer_size, this.numOut, this.outs);
        
        // Compute all running voices
        try {
            for (var i = 0; i < this.polyphony; i++) {
                if (this.dsp_voices_state[i] != this.kFreeVoice) {
                    // Compute voice
                    this.factory.compute(this.dsp_voices[i], polyDjembePolyProcessor.buffer_size, this.ins, this.mixing);
                    // Mix it in result
                    this.dsp_voices_level[i] = this.mixer.mixVoice(polyDjembePolyProcessor.buffer_size, this.numOut, this.mixing, this.outs);
                    // Check the level to possibly set the voice in kFreeVoice again
                    if ((this.dsp_voices_level[i] < 0.0005) && (this.dsp_voices_state[i] === this.kReleaseVoice)) {
                        this.dsp_voices_state[i] = this.kFreeVoice;
                    }
                }
            }

            // Apply effect
            if (this.effect) {
                this.effect.compute(this.effect_start, polyDjembePolyProcessor.buffer_size, this.outs, this.outs);
            }
        } catch(e) {
        	console.log("ERROR in compute (" + e + ")");
        }
        
        // Update bargraph
        this.update_outputs();
        
        // Copy outputs
        if (output !== undefined) {
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }
        
        return this.running;
    }
}

// Globals
polyDjembePolyProcessor.buffer_size = 128;

// Synchronously compile and instantiate the WASM modules
try {
    if (polyDjembePolyProcessor.wasm_mixer_module == undefined) {
        polyDjembePolyProcessor.wasm_mixer_module = new WebAssembly.Module(polyDjembePolyProcessor.atob(getBase64Mixer()));
        polyDjembePolyProcessor.wasm_module = new WebAssembly.Module(polyDjembePolyProcessor.atob(getBase64CodepolyDjembe()));
        // Possibly compile effect
        if (typeof (getBase64Codeeffect) !== "undefined") {
            polyDjembePolyProcessor.wasm_effect_module = new WebAssembly.Module(polyDjembePolyProcessor.atob(getBase64Codeeffect()));
        }
        registerProcessor('polyDjembePoly', polyDjembePolyProcessor);
    }
} catch (e) {
    console.log(e); console.log("Faust polyDjembePoly cannot be loaded or compiled");
}


