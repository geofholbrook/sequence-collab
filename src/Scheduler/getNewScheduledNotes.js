"use strict";
exports.__esModule = true;
var windowPosition_1 = require("./windowPosition");
function getNewScheduledNotes(loop, acTime, lookAhead, prevHorizon, loopLength) {
    var win = {
        min: Math.max(acTime, prevHorizon),
        max: acTime + lookAhead
    };
    // express range as number of loops
    var rawPropWindow = { min: win.min / loopLength, max: win.max / loopLength };
    // translate range so that min falls between 0 and 1
    var translation = (rawPropWindow.min % 1) - rawPropWindow.min;
    var propWindow = {
        min: rawPropWindow.min + translation,
        max: rawPropWindow.max + translation
    };
    var schedule = loop
        .map(function (note) {
        var pos = windowPosition_1.windowPosition(note.loopTime, propWindow);
        if (!pos)
            return null;
        return {
            data: note.data,
            audioContextTime: (pos - translation) * loopLength
        };
    })
        .filter(Boolean);
    return {
        schedule: schedule,
        horizon: win.max
    };
}
exports.getNewScheduledNotes = getNewScheduledNotes;
