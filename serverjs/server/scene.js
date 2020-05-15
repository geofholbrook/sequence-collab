"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var _types_1 = require("../@types");
var dataPath_1 = require("./dataPath");
var util_1 = require("util");
var initialState_1 = require("../initialState");
var writeFile = util_1.promisify(fs.writeFile);
var readFile = util_1.promisify(fs.readFile);
function saveScene(params) {
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            path = "/users/" + params.user + "/scenes/" + params.scene.name + ".scene";
            try {
                writeFile(dataPath_1.storageRoot + path, JSON.stringify(params.scene, null, 4));
                return [2 /*return*/, {
                        success: true,
                        status: 'Saved',
                        message: "saved scene to " + path,
                    }];
            }
            catch (e) {
                return [2 /*return*/, {
                        success: false,
                        status: 'NotSaved',
                        message: e.message,
                    }];
            }
            return [2 /*return*/];
        });
    });
}
exports.saveScene = saveScene;
function loadScene(params) {
    return __awaiter(this, void 0, void 0, function () {
        var path, buffer, original, scene, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = "/users/" + params.user + "/scenes/" + params.sceneName + ".scene";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, readFile(dataPath_1.storageRoot + path)];
                case 2:
                    buffer = _a.sent();
                    original = JSON.parse(buffer.toString());
                    scene = backwardCompat(original);
                    return [2 /*return*/, {
                            success: true,
                            status: 'Loaded',
                            message: "successfuly loaded scene from " + path,
                            scene: scene,
                        }];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            status: 'NotLoaded',
                            message: e_1.message,
                            scene: null,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.loadScene = loadScene;
function backwardCompat(rawScene) {
    if (rawScene.version < '0.2.1') {
        return {
            name: rawScene.name,
            version: _types_1.currentSceneVersion,
            reduxState: {
                lanes: initialState_1.initialState.lanes,
            },
        };
    }
    else {
        return rawScene;
        // return {
        // 	...rawScene,
        // 	lanes: rawScene.lanes.map((lane:any) => !!lane.laneId ? lane : {
        // 		...lane,
        // 		laneId: uuid()
        // 	})
        // }
        // this doesn't work
        // return {
        // 	...rawScene,
        // 	reduxState: {
        // 		...rawScene.reduxState,
        // 		lanes: rawScene.lanes.map((lane: any) => laneBackwardCompat(lane, rawScene.version)),
        // 	},
        // };
    }
}