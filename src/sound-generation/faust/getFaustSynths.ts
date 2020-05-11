import { FaustSynth } from "./FaustSynth";
import { ISynth } from "../../@types"

const faustModuleNames = ["djimbo", "monoDjembe"]

const { Djimbo } = require('./workletnodes/djimbo') 

// they live here, for now.

const faustSynths = [
    new FaustSynth(Djimbo, 'djimbo')
]

export function getFaustSynths(): ISynth[] {
    
    
    return {
        "faustDjembe": {
            name: 
        }
        }
    
}