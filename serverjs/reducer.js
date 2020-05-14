"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_elements_1 = require("@musicenviro/ui-elements");
var initialState_1 = require("./initialState");
// typescript was a little tricky here.
// 1. state in reducer must allow undefined
// 2. createStore must have 4 generic types, can't be just 2
function reducer(_state, _action) {
    var state = _state || initialState_1.initialState;
    // access to after state, for debugging
    var after = reduce();
    return after;
    function reduce() {
        var _a;
        switch (_action.type) {
            case 'SET_ROOT_PROPERTY': {
                var action = _action;
                return __assign(__assign({}, state), (_a = {}, _a[action.propertyName] = action.value, _a));
            }
            case 'SET_CELL': {
                var action_1 = _action;
                return __assign(__assign({}, state), { lanes: state.lanes.map(function (lane) {
                        if (lane.laneId !== action_1.laneId)
                            return lane;
                        if (lane.laneType !== 'DiatonicPianoRoll') {
                            throw new Error("SET_CELL called on lane of type " + lane.laneType);
                        }
                        var rollLane = lane;
                        return __assign(__assign({}, rollLane), { rows: ui_elements_1.modifyLaneCell(rollLane.rows, action_1.rowIndex, action_1.cellIndex, action_1.active) });
                    }) });
            }
            case 'ADD_LANE': {
                var action_2 = _action;
                var insertIndex = action_2.after
                    ? state.lanes.findIndex(function (lane) { return lane.laneId === action_2.after; }) + 1
                    : state.lanes.length - 1;
                return __assign(__assign({}, state), { lanes: __spreadArrays(state.lanes.slice(0, insertIndex), [
                        action_2.lane
                    ], state.lanes.slice(insertIndex)).sort(function (a, b) { return a.laneType.localeCompare(b.laneType); }) });
            }
            case 'DELETE_LANE': {
                var action_3 = _action;
                return __assign(__assign({}, state), { lanes: state.lanes.filter(function (lane) { return lane.laneId !== action_3.laneId; }) });
            }
            case 'SET_LANE_PROPERTY': {
                var action_4 = _action;
                var newState = __assign(__assign({}, state), { lanes: state.lanes.map(function (lane) {
                        var _a;
                        return lane.laneId === action_4.laneId
                            ? __assign(__assign({}, lane), (_a = {}, _a[action_4.property] = action_4.value, _a)) : lane;
                    }) });
                return newState;
            }
            case 'ROTATE': {
                var action_5 = _action;
                return __assign(__assign({}, state), { lanes: state.lanes.map(function (lane) { return rotateLane(lane, action_5.amount); }) });
            }
            case 'LOAD_STATE': {
                var action = _action;
                return __assign(__assign({}, state), action.state);
            }
            case 'SET_USER': {
                var action = _action;
                return __assign(__assign({}, state), { user: action.user });
            }
            default:
                return state;
        }
    }
}
exports.reducer = reducer;
function rotateLane(_lane, amount) {
    var splitIndex = (-amount + 16) % 16;
    switch (_lane.laneType) {
        case 'DiatonicPianoRoll': {
            var lane = _lane;
            return __assign(__assign({}, lane), { rows: lane.rows.map(function (row) { return (__assign(__assign({}, row), { cells: __spreadArrays(row.cells.slice(splitIndex), row.cells.slice(0, splitIndex)) })); }) });
        }
        case 'SingleNoteLane': {
            var lane = _lane;
            return __assign(__assign({}, lane), { loopTimes: lane.loopTimes.map(function (time) { return (time + amount / 16 + 1) % 1; }) });
        }
        default:
            throw new Error('unknown lane type');
    }
}
