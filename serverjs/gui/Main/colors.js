"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * get an rgb color that is derived deterministically from a string
 * more or less bright, using sin functions to get component values
 * @param name
 */
function getColorFromString(name) {
    // arbitrary number
    var num = Array.from(name)
        .map(function (char, i) { return (char.charCodeAt(0) % 26) * Math.pow(2, Math.max(i, 6)); })
        .reduce(function (sum, c) { return sum + c; }, 0);
    // little trick to get decent colors
    var radians = (num % 6283) * 0.001;
    var radiansToByte = function (r) { return Math.floor((Math.sin(r) * 0.5 + 0.5) * 256); };
    var red = radiansToByte(radians);
    var green = radiansToByte(radians + (Math.PI * 2) / 3);
    var blue = radiansToByte(radians + (Math.PI * 4) / 3);
    return "rgb(" + red + "," + green + "," + blue + ")";
}
exports.getColorFromString = getColorFromString;
// console.log(getColorFromString('kick'))
// console.log(getColorFromString('snare'))
// console.log(getColorFromString('hihat'))
// console.log(getColorFromString('tablaalsdkjf'))
