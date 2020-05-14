"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var socketClient_1 = require("./socketClient");
var reducer_1 = require("./reducer");
var initialState_1 = require("./initialState");
function createAppStore() {
    var store = redux_1.createStore(reducer_1.reducer, initialState_1.initialState);
    // =============================================================================
    // modify store.dispatch to update the server, optionally
    // maybe this is supposed to be an "enhancer"? or "middleware"?
    // =============================================================================
    var originalDispatch = store.dispatch;
    store.dispatch = (function (action) {
        if (action.broadcast) {
            var payload = {
                user: store.getState().user,
                type: 'ReduxAction',
                content: action,
            };
            socketClient_1.socketClient.send(payload);
        }
        if (['SET_CELL', 'SET_DRUM_LANES', 'ADD_LANE', 'DELETE_LANE', 'SET_LANE_PROPERTY'].includes(action.type)) {
            store.dispatch({
                type: 'SET_ROOT_PROPERTY',
                propertyName: 'saveState',
                value: 'Dirty',
            });
        }
        return originalDispatch(action);
    });
    return store;
}
exports.createAppStore = createAppStore;
