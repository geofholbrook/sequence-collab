
/*
Code generated with Faust version 2.23.6
Compilation options: -lang wasm-ib -scal -ftz 2
*/

function getJSONdjimbo() {
	return '{"name": "djimbo","filename": "djimbo.dsp","version": "2.23.6","compile_options": "-lang wasm-ib -scal -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/basics.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/usr/local/share/faust/physmodels.lib","/usr/local/share/faust/oscillators.lib","/usr/local/share/faust/noises.lib","/usr/local/share/faust/filters.lib","/usr/local/share/faust/envelopes.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust","./src/sound-generation/faust/dsp-files","/Users/geof/Data/programming/music-enviro/sequence-collab/./src/sound-generation/faust/dsp-files"],"size": 262792,"inputs": 0,"outputs": 1,"meta": [ { "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.1" },{ "envelopes.lib/ar:author": "Yann Orlarey, Stéphane Letz" },{ "envelopes.lib/author": "GRAME" },{ "envelopes.lib/copyright": "GRAME" },{ "envelopes.lib/license": "LGPL with exception" },{ "envelopes.lib/name": "Faust Envelope Library" },{ "envelopes.lib/version": "0.1" },{ "filename": "djimbo.dsp" },{ "filters.lib/fir:author": "Julius O. Smith III" },{ "filters.lib/fir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/fir:license": "MIT-style STK-4.3 license" },{ "filters.lib/highpass:author": "Julius O. Smith III" },{ "filters.lib/highpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:author": "Julius O. Smith III" },{ "filters.lib/iir:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/iir:license": "MIT-style STK-4.3 license" },{ "filters.lib/lowpass0_highpass1": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass0_highpass1:author": "Julius O. Smith III" },{ "filters.lib/lowpass:author": "Julius O. Smith III" },{ "filters.lib/lowpass:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/lowpass:license": "MIT-style STK-4.3 license" },{ "filters.lib/name": "Faust Filters Library" },{ "filters.lib/tf2:author": "Julius O. Smith III" },{ "filters.lib/tf2:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2:license": "MIT-style STK-4.3 license" },{ "filters.lib/tf2s:author": "Julius O. Smith III" },{ "filters.lib/tf2s:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/tf2s:license": "MIT-style STK-4.3 license" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.2" },{ "name": "djimbo" },{ "noises.lib/name": "Faust Noise Generator Library" },{ "noises.lib/version": "0.0" },{ "oscillators.lib/name": "Faust Oscillator Library" },{ "oscillators.lib/version": "0.0" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" }],"ui": [ {"type": "vgroup","label": "djimbo","items": [ {"type": "nentry","label": "beat/tempo","address": "/djimbo/beat/tempo","index": 262260,"init": 180,"min": 40,"max": 200,"step": 1}]}]}';
}
function getBase64Codedjimbo() { return "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aWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L25vaXNlcy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L2ZpbHRlcnMubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9lbnZlbG9wZXMubGliIl0sImluY2x1ZGVfcGF0aG5hbWVzIjogWyIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3Ivc2hhcmUvZmF1c3QiLCIuL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyIsIi9Vc2Vycy9nZW9mL0RhdGEvcHJvZ3JhbW1pbmcvbXVzaWMtZW52aXJvL3NlcXVlbmNlLWNvbGxhYi8uL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyJdLCJzaXplIjogMjYyNzkyLCJpbnB1dHMiOiAwLCJvdXRwdXRzIjogMSwibWV0YSI6IFsgeyAiYmFzaWNzLmxpYi9uYW1lIjogIkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSIgfSx7ICJiYXNpY3MubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImVudmVsb3Blcy5saWIvYXI6YXV0aG9yIjogIllhbm4gT3JsYXJleSwgU3TDqXBoYW5lIExldHoiIH0seyAiZW52ZWxvcGVzLmxpYi9hdXRob3IiOiAiR1JBTUUiIH0seyAiZW52ZWxvcGVzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAiZW52ZWxvcGVzLmxpYi9saWNlbnNlIjogIkxHUEwgd2l0aCBleGNlcHRpb24iIH0seyAiZW52ZWxvcGVzLmxpYi9uYW1lIjogIkZhdXN0IEVudmVsb3BlIExpYnJhcnkiIH0seyAiZW52ZWxvcGVzLmxpYi92ZXJzaW9uIjogIjAuMSIgfSx7ICJmaWxlbmFtZSI6ICJkamltYm8uZHNwIiB9LHsgImZpbHRlcnMubGliL2ZpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9maXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2ZpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6YXV0aG9yIjogIkp1bGl1cyBPLiBTbWl0aCBJSUkiIH0seyAiZmlsdGVycy5saWIvaGlnaHBhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9paXI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2lpcjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvbG93cGFzczBfaGlnaHBhc3MxIjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3MwX2hpZ2hwYXNzMTphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi9sb3dwYXNzOmF1dGhvciI6ICJKdWxpdXMgTy4gU21pdGggSUlJIiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3M6bGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImZpbHRlcnMubGliL25hbWUiOiAiRmF1c3QgRmlsdGVycyBMaWJyYXJ5IiB9LHsgImZpbHRlcnMubGliL3RmMjphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjI6Y29weXJpZ2h0IjogIkNvcHlyaWdodCAoQykgMjAwMy0yMDE5IGJ5IEp1bGl1cyBPLiBTbWl0aCBJSUkgPGpvc0BjY3JtYS5zdGFuZm9yZC5lZHU+IiB9LHsgImZpbHRlcnMubGliL3RmMjpsaWNlbnNlIjogIk1JVC1zdHlsZSBTVEstNC4zIGxpY2Vuc2UiIH0seyAiZmlsdGVycy5saWIvdGYyczphdXRob3IiOiAiSnVsaXVzIE8uIFNtaXRoIElJSSIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMDMtMjAxOSBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJmaWx0ZXJzLmxpYi90ZjJzOmxpY2Vuc2UiOiAiTUlULXN0eWxlIFNUSy00LjMgbGljZW5zZSIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi4yIiB9LHsgIm5hbWUiOiAiZGppbWJvIiB9LHsgIm5vaXNlcy5saWIvbmFtZSI6ICJGYXVzdCBOb2lzZSBHZW5lcmF0b3IgTGlicmFyeSIgfSx7ICJub2lzZXMubGliL3ZlcnNpb24iOiAiMC4wIiB9LHsgIm9zY2lsbGF0b3JzLmxpYi9uYW1lIjogIkZhdXN0IE9zY2lsbGF0b3IgTGlicmFyeSIgfSx7ICJvc2NpbGxhdG9ycy5saWIvdmVyc2lvbiI6ICIwLjAiIH0seyAicGxhdGZvcm0ubGliL25hbWUiOiAiR2VuZXJpYyBQbGF0Zm9ybSBMaWJyYXJ5IiB9LHsgInBsYXRmb3JtLmxpYi92ZXJzaW9uIjogIjAuMSIgfV0sInVpIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiZGppbWJvIiwiaXRlbXMiOiBbIHsidHlwZSI6ICJuZW50cnkiLCJsYWJlbCI6ICJiZWF0L3RlbXBvIiwiYWRkcmVzcyI6ICIvZGppbWJvL2JlYXQvdGVtcG8iLCJpbmRleCI6IDI2MjI2MCwiaW5pdCI6IDE4MCwibWluIjogNDAsIm1heCI6IDIwMCwic3RlcCI6IDF9XX1dfQ=="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

// Monophonic Faust DSP
class djimboProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            djimboProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            djimboProcessor.parse_items(group.items, obj, callback);
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
            djimboProcessor.parse_items(item.items, obj, callback);
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
            djimboProcessor.parse_items(item.items, obj, callback);
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
        djimboProcessor.parse_ui(JSON.parse(getJSONdjimbo()).ui, params, djimboProcessor.parse_item1);
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
        
        this.djimbo_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
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
        
        this.factory = this.djimbo_instance.exports;
        this.HEAP = this.djimbo_instance.exports.memory.buffer;
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
            djimboProcessor.parse_ui(this.json_object.ui, this, djimboProcessor.parse_item2);
                 
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
    registerProcessor('djimbo', djimboProcessor);
} catch (error) {
    console.warn(error);
}
