
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

if (typeof (AudioWorkletNode) === "undefined") {
	alert("AudioWorklet is not supported in this browser !")
}

class polyDjembePolyNode extends AudioWorkletNode {

    constructor(context, baseURL, options)
    {
        var json_object = JSON.parse(getJSONpolyDjembe());
      
        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'polyDjembePoly', options);
        this.baseURL = baseURL;
      
        // JSON parsing functions
        this.parse_ui = function(ui, obj)
        {
            for (var i = 0; i < ui.length; i++) {
                this.parse_group(ui[i], obj);
            }
        }

        this.parse_group = function(group, obj)
        {
            if (group.items) {
                this.parse_items(group.items, obj);
            }
        }

        this.parse_items = function(items, obj)
        {
            for (var i = 0; i < items.length; i++) {
            	this.parse_item(items[i], obj);
            }
        }

        this.parse_item = function(item, obj)
        {
            if (item.type === "vgroup"
                || item.type === "hgroup"
                || item.type === "tgroup") {
                this.parse_items(item.items, obj);
            } else if (item.type === "hbargraph"
                       || item.type === "vbargraph") {
                // Keep bargraph adresses
                obj.outputs_items.push(item.address);
            } else if (item.type === "vslider"
                       || item.type === "hslider"
                       || item.type === "button"
                       || item.type === "checkbox"
                       || item.type === "nentry") {
                // Keep inputs adresses
                obj.inputs_items.push(item.address);         
                // Define setXXX/getXXX, replacing '/c' with 'C' everywhere in the string
                var set_name = "set" + item.address;
                var get_name = "get" + item.address;
                get_name = get_name.replace(/\/./g, (x) => { return x.substr(1,1).toUpperCase(); });
                set_name = set_name.replace(/\/./g, (x) => { return x.substr(1,1).toUpperCase(); });
                obj[set_name] = (val) => { obj.setParamValue(item.address, val); };
                obj[get_name] = () => { return obj.getParamValue(item.address); };
                //console.log(set_name);
                //console.log(get_name);
            }
        }

        this.json_object = json_object;

        // if (typeof (getJSONeffect) !== "undefined") {
        //     this.effect_json_object = JSON.parse(getJSONeffect());
        // }

        this.output_handler = null;

        // input/output items
        this.inputs_items = [];
        this.outputs_items = [];

        // Parse UI
        this.parse_ui(this.json_object.ui, this);

        if (this.effect_json_object) {
            this.parse_ui(this.effect_json_object.ui, this);
        }

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
        try {
            if (this.parameters) this.parameters.forEach(p => p.automationRate = "k-rate");
        } catch (e) {}
    }

    // To be called by the message port with messages coming from the processor
    handleMessage(event)
    {
        var msg = event.data;
        if (this.output_handler) {
            this.output_handler(msg.path, msg.value);
        }
    }

    // Public API
    
    /**
     * Destroy the node, deallocate resources.
     */
    destroy()
    {
        this.port.postMessage({ type: "destroy" });
        this.port.close();
    }
	
    /**
     *  Returns a full JSON description of the DSP.
     */
    getJSON()
    {
        var res = "";
        res = res.concat("{\"name\":\""); res = res.concat(this.json_object.name); res = res.concat("\",");
        res = res.concat("\"version\":\""); res = res.concat(this.json_object.version); res = res.concat("\",");
        res = res.concat("\"options\":\""); res = res.concat(this.json_object.options); res = res.concat("\",");
        res = res.concat("\"inputs\":\""); res = res.concat(this.json_object.inputs); res = res.concat("\",");
        res = res.concat("\"outputs\":\""); res = res.concat(this.json_object.outputs); res = res.concat("\",");
        res = res.concat("\"meta\":"); res = res.concat(JSON.stringify(this.json_object.meta)); res = res.concat(",");

        if (this.effect_json_object) {
            res = res.concat("\"ui\":[{\"type\":\"tgroup\",\"label\":\"Sequencer\",\"items\":[");
            res = res.concat("{\"type\": \"vgroup\",\"label\":\"Instrument\",\"items\":");
            res = res.concat(JSON.stringify(this.json_object.ui));
            res = res.concat("},");
            res = res.concat("{\"type\":\"vgroup\",\"label\":\"Effect\",\"items\":");
            res = res.concat(JSON.stringify(this.effect_json_object.ui));
            res = res.concat("}");
            res = res.concat("]}]}");
            return res;
        } else {
            res = res.concat("\"ui\":[{\"type\":\"tgroup\",\"label\":\"Polyphonic\",\"items\":[");
            res = res.concat("{\"type\": \"vgroup\",\"label\":\"Voices\",\"items\":");
            res = res.concat(JSON.stringify(this.json_object.ui));
            res = res.concat("},");
            res = res.concat("]}]}");
            return res;
        }
    }
    
    // For WAP
    async getMetadata()
    {
        return new Promise(resolve => {
            let real_url = (this.baseURL === "") ? "main.json" : (this.baseURL + "/main.json");
            fetch(real_url).then(responseJSON => {
                return responseJSON.json();
            }).then(json => {
                resolve(json);
            })
        });
    }

    /**
     *  Set the control value at a given path.
     *
     * @param path - a path to the control
     * @param val - the value to be set
     */
    setParamValue(path, val)
    {
        this.port.postMessage({ type:"param", key:path, value:val });
        this.parameters.get(path).setValueAtTime(val, 0);
    }
    
    // For WAP
    setParam(path, val)
    {
        this.port.postMessage({ type:"param", key:path, value:val });
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
    getParamValue(path)
    {
        return this.parameters.get(path).value;
    }
    
    // For WAP
    getParam(path)
    {
        return this.parameters.get(path).value;
    }

    /**
     * Setup a control output handler with a function of type (path, value)
     * to be used on each generated output value. This handler will be called
     * each audio cycle at the end of the 'compute' method.
     *
     * @param handler - a function of type function(path, value)
     */
    setOutputParamHandler(handler)
    {
        this.output_handler = handler;
    }

    /**
     * Get the current output handler.
     */
    getOutputParamHandler()
    {
        return this.output_handler;
    }

    getNumInputs()
    {
        return parseInt(this.json_object.inputs);
    }

    getNumOutputs()
    {
        return parseInt(this.json_object.outputs);
    }
    
    // For WAP
    inputChannelCount()
    {
        return parseInt(this.json_object.inputs);
    }
    
    outputChannelCount()
    {
        return parseInt(this.json_object.outputs);
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getParams()
    {
        return this.inputs_items;
    }
        
    // For WAP
    getDescriptor()
    {
        var desc = {};
        for (const item in this.descriptor) {
            if (this.descriptor.hasOwnProperty(item)) {
                if (this.descriptor[item].label != "bypass") {
                    desc = Object.assign({ [this.descriptor[item].label]: { minValue: this.descriptor[item].min, maxValue: this.descriptor[item].max, defaultValue: this.descriptor[item].init } }, desc);
                }
            }
        }
        return desc;
    }

    /**
     * Instantiates a new polyphonic voice.
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param pitch - the MIDI pitch (0..127)
     * @param velocity - the MIDI velocity (0..127)
     */
    keyOn(channel, pitch, velocity)
    {
        this.port.postMessage({ type: "keyOn", data: [channel, pitch, velocity] });
    }

    /**
     * De-instantiates a polyphonic voice.
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param pitch - the MIDI pitch (0..127)
     * @param velocity - the MIDI velocity (0..127)
     */
    keyOff(channel, pitch, velocity)
    {
        this.port.postMessage({ type: "keyOff", data: [channel, pitch, velocity] });
    }

    /**
     * Gently terminates all the active voices.
     */
    allNotesOff()
    {
        const channel = 1;
        this.port.postMessage({ type: "ctrlChange", data: [channel, 123, 0] });
    }

    /**
     * Control change
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param ctrl - the MIDI controller number (0..127)
     * @param value - the MIDI controller value (0..127)
     */
    ctrlChange(channel, ctrl, value)
    {
        this.port.postMessage({ type: "ctrlChange", data: [channel, ctrl, value] });
    }

    /**
     * PitchWeel
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param value - the MIDI controller value (-1..1)
     */
    pitchWheel(channel, wheel)
    {
        this.port.postMessage({ type: "pitchWheel", data: [channel, wheel] });
    }

    /**
     * Generic MIDI message handler.
     */
    midiMessage(data)
    {
    	this.port.postMessage({ type:"midi", data:data });
    }
    
    /**
     * @returns {Object} describes the path for each available param and its current value
     */
    async getState()
    {
        var params = new Object();
        for (let i = 0; i < this.getParams().length; i++) {
            Object.assign(params, { [this.getParams()[i]]: `${this.getParam(this.getParams()[i])}` });
        }
        return new Promise(resolve => { resolve(params) });
    }
    
    /**
     * Sets each params with the value indicated in the state object
     * @param {Object} state
     */
    async setState(state)
    {
        return new Promise(resolve => {
            for (const param in state) {
                if (state.hasOwnProperty(param)) this.setParam(param, state[param]);
            }
            try {
                this.gui.setAttribute('state', JSON.stringify(state));
            } catch (error) {
                console.warn("Plugin without gui or GUI not defined", error);
            }
            resolve(state);
        })
    }

}

// Factory class
class polyDjembePoly {

    /**
     * Factory constructor.
     *
     * @param context - the audio context
     * @param polyphony - the number of voices
     * @param baseURL - the baseURL of the plugin folder
     */
    constructor(context, polyphony = 16, baseURL = "")
    {
        console.log("baseLatency " + context.baseLatency);
        console.log("outputLatency " + context.outputLatency);
        console.log("sampleRate " + context.sampleRate);

        this.context = context;
        this.polyphony = polyphony;
        this.baseURL = baseURL;
    }

    /**
     * Load additionnal resources to prepare the custom AudioWorkletNode. Returns a promise to be used with the created node.
     */
    async load()
    {
    	return new Promise((resolve, reject) => {   
            let real_url = (this.baseURL === "") ? "polyDjembe-processor.js" : (this.baseURL + "/polyDjembe-processor.js");
            console.log(real_url)
            let options = { polyphony: this.polyphony };
            this.context.audioWorklet.addModule(real_url).then(() => {
            this.node = new polyDjembePolyNode(this.context, this.baseURL, { processorOptions: options });
            this.node.onprocessorerror = () => { console.log('An error from polyDjembe-processor was detected.');}
            return (this.node);
            }).then((node) => {
                resolve(node);
            }).catch((e) => {
                reject(e);
            });
        });
    }

    // async loadGui() 
    // {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             // DO THIS ONLY ONCE. If another instance has already been added, do not add the html file again
    //             let real_url = (this.baseURL === "") ? "main.html" : (this.baseURL + "/main.html");
    //             if (!this.linkExists(real_url)) {
    //                 // LINK DOES NOT EXIST, let's add it to the document
    //                 var link = document.createElement('link');
    //                 link.rel = 'import';
    //                 link.href = real_url;
    //                 document.head.appendChild(link);
    //                 link.onload = (e) => {
    //                     // the file has been loaded, instanciate GUI
    //                     // and get back the HTML elem
    //                     // HERE WE COULD REMOVE THE HARD CODED NAME
    //                     var element = createpolyDjembeGUI(this.node);
    //                     resolve(element);
    //                 }
    //             } else {
    //                 // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
    //                 // so we can create another instance
    //                 var element = createpolyDjembeGUI(this.node);
    //                 resolve(element);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             reject(e);
    //         }
    //     });
    // };
    
    linkExists(url) 
    {
    	return document.querySelectorAll(`link[href="${url}"]`).length > 0;
    }
}

const dspName = "polyDjembePoly";

// WAP factory or npm package module
if (typeof module === "undefined") {
    window.polyDjembePoly = polyDjembePoly;
    window.FaustpolyDjembePoly = polyDjembePoly;
    window[dspName] = polyDjembePoly;
} else {
    module.exports = { polyDjembePoly };
}
