"use strict";
exports.__esModule = true;
/**
 *
 * @param loopTime
 * @param propWindow window expressed as prop time. if it spans the threshold, max will be greater than 1,
 *                      but min is always 0-1
 * @param loopLength
 */
function windowPosition(loopTime, propWindow) {
    var offset = (loopTime - propWindow.min + 1) % 1;
    if (offset > propWindow.max - propWindow.min)
        return null;
    if (loopTime < propWindow.min) {
        return loopTime + 1;
    }
    else {
        return loopTime;
    }
}
exports.windowPosition = windowPosition;
