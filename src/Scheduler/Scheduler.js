"use strict";
exports.__esModule = true;
var events_1 = require("events");
var getNewScheduledNotes_1 = require("./getNewScheduledNotes");
var lookahead = 0.1;
var timerInterval = 25;
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.loop = [];
        this.prevHorizon = 0; // how far we looked ahead on the last iteration
        this.emitter = new events_1.EventEmitter();
        this.loopLength = 2; // seconds
    }
    Scheduler.prototype.setAudioContext = function (ac) {
        this.ac = ac;
    };
    Scheduler.prototype.setLoop = function (loop) {
        this.loop = loop;
    };
    Scheduler.prototype.start = function () {
        var _this = this;
        if (!this.timer) {
            this.timer = setInterval(function () { return _this.iterate(); }, timerInterval);
        }
    };
    Scheduler.prototype.emitSchedule = function (notes) {
        this.emitter.emit('schedule', notes);
    };
    Scheduler.prototype.onSchedule = function (callback) {
        this.emitter.on('schedule', callback);
    };
    Scheduler.prototype.iterate = function () {
        var _a = getNewScheduledNotes_1.getNewScheduledNotes(this.loop, this.ac.currentTime, lookahead, this.prevHorizon, this.loopLength), schedule = _a.schedule, horizon = _a.horizon;
        this.prevHorizon = horizon;
        if (schedule.length > 0) {
            this.emitSchedule(schedule);
        }
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
