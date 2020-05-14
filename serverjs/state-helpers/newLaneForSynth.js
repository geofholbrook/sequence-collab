"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var colors_1 = require("../gui/Main/colors");
var ui_elements_1 = require("@musicenviro/ui-elements");
var noteSynthNames_1 = require("../sound-generation/noteSynthNames");
var defaultStepRange = { min: -3, max: 14 };
function newLaneForSynth(synthName) {
    if (!noteSynthNames_1.noteSynthNames.includes(synthName)) {
        return {
            laneId: uuid_1.v1(),
            laneType: 'SingleNoteLane',
            synthName: synthName,
            loopTimes: [],
            volumeDb: 0,
            muted: false,
            color: colors_1.getColorFromString(synthName)
        };
    }
    else {
        return {
            laneId: uuid_1.v1(),
            laneType: 'DiatonicPianoRoll',
            synthName: synthName,
            muted: false,
            volumeDb: 0,
            stepRange: defaultStepRange,
            zeroPitch: 48,
            mode: 'Dorian',
            rows: ui_elements_1.makeDefaultLanes(defaultStepRange),
        };
    }
}
exports.newLaneForSynth = newLaneForSynth;
