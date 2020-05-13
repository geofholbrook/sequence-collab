
/*
Code generated with Faust version 2.23.6
Compilation options: -lang wasm-ib -scal -ftz 2
*/

function getJSONlowSquare() {
	return '{"name": "lowSquare","filename": "lowSquare.dsp","version": "2.23.6","compile_options": "-lang wasm-ib -scal -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/envelopes.lib","/usr/local/share/faust/oscillators.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/usr/local/share/faust/signals.lib","/usr/local/share/faust/basics.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust","./src/sound-generation/faust/dsp-files","/Users/geof/Data/programming/music-enviro/sequence-collab/./src/sound-generation/faust/dsp-files"],"size": 16452,"inputs": 0,"outputs": 1,"meta": [ { "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.1" },{ "envelopes.lib/author": "GRAME" },{ "envelopes.lib/copyright": "GRAME" },{ "envelopes.lib/license": "LGPL with exception" },{ "envelopes.lib/name": "Faust Envelope Library" },{ "envelopes.lib/version": "0.1" },{ "filename": "lowSquare.dsp" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.2" },{ "name": "lowSquare" },{ "oscillators.lib/name": "Faust Oscillator Library" },{ "oscillators.lib/version": "0.0" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.1" },{ "signals.lib/name": "Faust Signal Routing Library" },{ "signals.lib/version": "0.0" }],"ui": [ {"type": "vgroup","label": "lowSquare","items": [ {"type": "nentry","label": "freq","address": "/lowSquare/freq","index": 40,"init": 100,"min": 10,"max": 10000,"step": 1},{"type": "nentry","label": "gain","address": "/lowSquare/gain","index": 0,"init": 1,"min": 0,"max": 1,"step": 0.01},{"type": "button","label": "gate","address": "/lowSquare/gate","index": 12}]}]}';
}
function getBase64CodelowSquare() { return "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dGRmYXVzdC5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L2VudmVsb3Blcy5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L29zY2lsbGF0b3JzLmxpYiIsIi91c3IvbG9jYWwvc2hhcmUvZmF1c3QvbWF0aHMubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9wbGF0Zm9ybS5saWIiLCIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0L3NpZ25hbHMubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9iYXNpY3MubGliIl0sImluY2x1ZGVfcGF0aG5hbWVzIjogWyIvdXNyL2xvY2FsL3NoYXJlL2ZhdXN0IiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3Ivc2hhcmUvZmF1c3QiLCIuL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyIsIi9Vc2Vycy9nZW9mL0RhdGEvcHJvZ3JhbW1pbmcvbXVzaWMtZW52aXJvL3NlcXVlbmNlLWNvbGxhYi8uL3NyYy9zb3VuZC1nZW5lcmF0aW9uL2ZhdXN0L2RzcC1maWxlcyJdLCJzaXplIjogMTY0NTIsImlucHV0cyI6IDAsIm91dHB1dHMiOiAxLCJtZXRhIjogWyB7ICJiYXNpY3MubGliL25hbWUiOiAiRmF1c3QgQmFzaWMgRWxlbWVudCBMaWJyYXJ5IiB9LHsgImJhc2ljcy5saWIvdmVyc2lvbiI6ICIwLjEiIH0seyAiZW52ZWxvcGVzLmxpYi9hdXRob3IiOiAiR1JBTUUiIH0seyAiZW52ZWxvcGVzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAiZW52ZWxvcGVzLmxpYi9saWNlbnNlIjogIkxHUEwgd2l0aCBleGNlcHRpb24iIH0seyAiZW52ZWxvcGVzLmxpYi9uYW1lIjogIkZhdXN0IEVudmVsb3BlIExpYnJhcnkiIH0seyAiZW52ZWxvcGVzLmxpYi92ZXJzaW9uIjogIjAuMSIgfSx7ICJmaWxlbmFtZSI6ICJsb3dTcXVhcmUuZHNwIiB9LHsgIm1hdGhzLmxpYi9hdXRob3IiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2NvcHlyaWdodCI6ICJHUkFNRSIgfSx7ICJtYXRocy5saWIvbGljZW5zZSI6ICJMR1BMIHdpdGggZXhjZXB0aW9uIiB9LHsgIm1hdGhzLmxpYi9uYW1lIjogIkZhdXN0IE1hdGggTGlicmFyeSIgfSx7ICJtYXRocy5saWIvdmVyc2lvbiI6ICIyLjIiIH0seyAibmFtZSI6ICJsb3dTcXVhcmUiIH0seyAib3NjaWxsYXRvcnMubGliL25hbWUiOiAiRmF1c3QgT3NjaWxsYXRvciBMaWJyYXJ5IiB9LHsgIm9zY2lsbGF0b3JzLmxpYi92ZXJzaW9uIjogIjAuMCIgfSx7ICJwbGF0Zm9ybS5saWIvbmFtZSI6ICJHZW5lcmljIFBsYXRmb3JtIExpYnJhcnkiIH0seyAicGxhdGZvcm0ubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgInNpZ25hbHMubGliL25hbWUiOiAiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSIgfSx7ICJzaWduYWxzLmxpYi92ZXJzaW9uIjogIjAuMCIgfV0sInVpIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAibG93U3F1YXJlIiwiaXRlbXMiOiBbIHsidHlwZSI6ICJuZW50cnkiLCJsYWJlbCI6ICJmcmVxIiwiYWRkcmVzcyI6ICIvbG93U3F1YXJlL2ZyZXEiLCJpbmRleCI6IDQwLCJpbml0IjogMTAwLCJtaW4iOiAxMCwibWF4IjogMTAwMDAsInN0ZXAiOiAxfSx7InR5cGUiOiAibmVudHJ5IiwibGFiZWwiOiAiZ2FpbiIsImFkZHJlc3MiOiAiL2xvd1NxdWFyZS9nYWluIiwiaW5kZXgiOiAwLCJpbml0IjogMSwibWluIjogMCwibWF4IjogMSwic3RlcCI6IDAuMDF9LHsidHlwZSI6ICJidXR0b24iLCJsYWJlbCI6ICJnYXRlIiwiYWRkcmVzcyI6ICIvbG93U3F1YXJlL2dhdGUiLCJpbmRleCI6IDEyfV19XX0="; }

/*
 faust2wasm: GRAME 2017-2019
*/
 
'use strict';

// Monophonic Faust DSP
class lowSquareProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            lowSquareProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            lowSquareProcessor.parse_items(group.items, obj, callback);
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
            lowSquareProcessor.parse_items(item.items, obj, callback);
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
            lowSquareProcessor.parse_items(item.items, obj, callback);
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
        lowSquareProcessor.parse_ui(JSON.parse(getJSONlowSquare()).ui, params, lowSquareProcessor.parse_item1);
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
        
        this.lowSquare_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
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
        
        this.factory = this.lowSquare_instance.exports;
        this.HEAP = this.lowSquare_instance.exports.memory.buffer;
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
            lowSquareProcessor.parse_ui(this.json_object.ui, this, lowSquareProcessor.parse_item2);
                 
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
    registerProcessor('lowSquare', lowSquareProcessor);
} catch (error) {
    console.warn(error);
}
