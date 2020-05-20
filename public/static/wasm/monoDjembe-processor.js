
/*
Code generated with Faust version 2.23.6
Compilation options: -lang wasm-ib -scal -ftz 2
*/

function getJSONmonoDjembe() {
	return '{"name": "monoDjembe","filename": "monoDjembe.dsp","version": "2.23.6","compile_options": "-lang wasm-ib -scal -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/physmodels.lib","/usr/local/share/faust/noises.lib","/usr/local/share/faust/filters.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/usr/local/share/faust/envelopes.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust","./src/sound-generation/faust/dsp-files","/Users/geof/Data/programming/music-enviro/sequence-collab/./src/sound-generation/faust/dsp-files"],"size": 608,"inputs": 0,"outputs": 1,"meta": [ { "envelopes.lib/ar:author": "Yann Orlarey, Stéphane Letz" },{ "envelopes.lib/author": "GRAME" },{ "envelopes.lib/copyright": "GRAME" },{ "envelopes.lib/license": "LGPL with exception" },{ "envelopes.lib/name": "Faust Envelope Library" },{ "envelopes.lib/version": "0.1" },{ "filename": "monoDjembe.dsp" },{ "filters.lib/fir:author": "Julius O. Smith III" },{ "filters.lib/fir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/fir:license": "MIT-style STK-4.3 license" },{ "filters.lib/highpass:author": "Julius O. Smith III" },{ "filters.lib/highpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:author": "Julius O. Smith III" },{ "filters.lib/iir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:license": "MIT-style STK-4.3 license" },{ "filters.lib/lowpass0_highpass1": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass0_highpass1:author": "Julius O. Smith III" },{ "filters.lib/lowpass:author": "Julius O. Smith III" },{ "filters.lib/lowpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass:license": "MIT-style STK-4.3 license" },{ "filters.lib/name": "Faust Filters Library" },{ "filters.lib/tf2:author": "Julius O. Smith III" },{ "filters.lib/tf2:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2:license": "MIT-style STK-4.3 license" },{ "filters.lib/tf2s:author": "Julius O. Smith III" },{ "filters.lib/tf2s:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2s:license": "MIT-style STK-4.3 license" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.2" },{ "name": "monoDjembe" },{ "noises.lib/name": "Faust Noise Generator Library" },{ "noises.lib/version": "0.0" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" }],"ui": [ {"type": "vgroup","label": "monoDjembe","items": [ {"type": "nentry","label": "freq","address": "/monoDjembe/freq","index": 132,"init": 100,"min": 10,"max": 10000,"step": 1},{"type": "nentry","label": "gain","address": "/monoDjembe/gain","index": 20,"init": 1,"min": 0,"max": 1,"step": 0.01},{"type": "button","label": "gate","address": "/monoDjembe/gate","index": 100}]}]}';
}
function getBase64CodemonoDjembe() { return "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cm0ubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9lbnZlbG9wZXMubGliIl0sImluY2x1ZGVfcGF0aG5hbWVzIjogWyIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3Ivc2hhcmUvZmF1c3QiLCIuL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyIsIi9Vc2Vycy9nZW9mL0RhdGEvcHJvZ3JhbW1pbmcvbXVzaWMtZW52aXJvL3NlcXVlbmNlLWNvbGxhYi8uL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyJdLCJzaXplIjogNjA4LCJpbnB1dHMiOiAwLCJvdXRwdXRzIjogMSwibWV0YSI6IFsgeyAiZW52ZWxvcGVzLmxpYi9hcjphdXRob3IiOiAiWWFubiBPcmxhcmV5LCBTdMOpcGhhbmUgTGV0eiIgfSx7ICJlbnZlbG9wZXMubGliL2F1dGhvciI6ICJHUkFNRSIgfSx7ICJlbnZlbG9wZXMubGliL2NvcHlyaWdodCI6ICJHUkFNRSIgfSx7ICJlbnZlbG9wZXMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJlbnZlbG9wZXMubGliL25hbWUiOiAiRmF1c3QgRW52ZWxvcGUgTGlicmFyeSIgfSx7ICJlbnZlbG9wZXMubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImZpbGVuYW1lIjogIm1vbm9EamVtYmUuZHNwIiB9LHsgImZpbHRlcnMubGliL2ZpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9maXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2ZpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6YXV0aG9yIjogIkp1bGl1cyBPLiBTbWl0aCBJSUkiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9paXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvbG93cGFzczBfaGlnaHBhc3MxIjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3MwX2hpZ2hwYXNzMTphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9sb3dwYXNzOmF1dGhvciI6ICJKdWxpdXMgTy4gU21pdGggSUlJIiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6bGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImZpbHRlcnMubGliL25hbWUiOiAiRmF1c3QgRmlsdGVycyBMaWJyYXJ5IiB9LHsgImZpbHRlcnMubGliL3RmMjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL3RmMjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvdGYyczphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMDMtMjAxOSBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmxpY2Vuc2UiOiAiTUlULXN0eWxlIFNUSy00LjMgbGljZW5zZSIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi4yIiB9LHsgIm5hbWUiOiAibW9ub0RqZW1iZSIgfSx7ICJub2lzZXMubGliL25hbWUiOiAiRmF1c3QgTm9pc2UgR2VuZXJhdG9yIExpYnJhcnkiIH0seyAibm9pc2VzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJwbGF0Zm9ybS5saWIvbmFtZSI6ICJHZW5lcmljIFBsYXRmb3JtIExpYnJhcnkiIH0seyAicGxhdGZvcm0ubGliL3ZlcnNpb24iOiAiMC4xIiB9XSwidWkiOiBbIHsidHlwZSI6ICJ2Z3JvdXAiLCJsYWJlbCI6ICJtb25vRGplbWJlIiwiaXRlbXMiOiBbIHsidHlwZSI6ICJuZW50cnkiLCJsYWJlbCI6ICJmcmVxIiwiYWRkcmVzcyI6ICIvbW9ub0RqZW1iZS9mcmVxIiwiaW5kZXgiOiAxMzIsImluaXQiOiAxMDAsIm1pbiI6IDEwLCJtYXgiOiAxMDAwMCwic3RlcCI6IDF9LHsidHlwZSI6ICJuZW50cnkiLCJsYWJlbCI6ICJnYWluIiwiYWRkcmVzcyI6ICIvbW9ub0RqZW1iZS9nYWluIiwiaW5kZXgiOiAyMCwiaW5pdCI6IDEsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAxfSx7InR5cGUiOiAiYnV0dG9uIiwibGFiZWwiOiAiZ2F0ZSIsImFkZHJlc3MiOiAiL21vbm9EamVtYmUvZ2F0ZSIsImluZGV4IjogMTAwfV19XX0="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

// Monophonic Faust DSP
class monoDjembeProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            monoDjembeProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            monoDjembeProcessor.parse_items(group.items, obj, callback);
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
            monoDjembeProcessor.parse_items(item.items, obj, callback);
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
            monoDjembeProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            obj.soundfile_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        }
    }
 
    static get parameterDescriptors() 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        monoDjembeProcessor.parse_ui(JSON.parse(getJSONmonoDjembe()).ui, params, monoDjembeProcessor.parse_item1);
 	    return params;
    }
   
    constructor(options)
    {
        super(options);
        this.running = true;
        
       	const importObject = {
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

                    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
                }
        };
        
        this.monoDjembe_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
        this.json_object = JSON.parse(options.processorOptions.json);
     
        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        this.integer_size = 4;
        
        this.factory = this.monoDjembe_instance.exports;
        this.HEAP = this.monoDjembe_instance.exports.memory.buffer;
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
        
        // soundfile items
        this.soundfile_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * NUM_FRAMES * this.sample_size);
        
        // Start of DSP memory : DSP is placed first with index 0
        this.dsp = 0;

        this.pathTable = [];
     
        // Send output values to the AudioNode
        this.update_outputs = function ()
        {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                }
            }
        }
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((NUM_FRAMES * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            monoDjembeProcessor.parse_ui(this.json_object.ui, this, monoDjembeProcessor.parse_item2);
                 
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.setParamValue = function (path, val)
        {
            this.HEAPF32[this.pathTable[path] >> 2] = val;
        }

        this.getParamValue = function (path)
        {
            return this.HEAPF32[this.pathTable[path] >> 2];
        }

        // Init resulting DSP
        this.initAux();
        console.log(this);
    }
    
    handleMessage(event)
    {
        var msg = event.data;
        switch (msg.type) {
            case "destroy": this.running = false; break;
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
        
        /*
        TODO: sample accurate control change is not yet handled
        When no automation occurs, params[i][1] has a length of 1,
        otherwise params[i][1] has a length of NUM_FRAMES with possible control change each sample
    	*/
        
        // Update controls
        for (const path in parameters) {
            const paramArray = parameters[path];
            this.setParamValue(path, paramArray[0]);
        }
        
        // Compute
        try {
            this.factory.compute(this.dsp, NUM_FRAMES, this.ins, this.outs);
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
const NUM_FRAMES = 128;
try {
    registerProcessor('monoDjembe', monoDjembeProcessor);
} catch (error) {
    console.warn(error);
}
