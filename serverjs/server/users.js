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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var dataPath_1 = require("./dataPath");
var session_1 = require("./session");
var config_1 = require("./config");
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default('sj:server:users');
var util_1 = require("util");
var config_2 = require("../config");
var storage_1 = require("./storage");
var readdir = util_1.promisify(fs_1.default.readdir);
var mkdir = util_1.promisify(fs_1.default.mkdir);
/**
 * all existing users.
 */
function getUsersSync() {
    return fs_1.default.readdirSync(dataPath_1.storageRoot + '/users');
}
exports.getUsersSync = getUsersSync;
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readdir(dataPath_1.storageRoot + '/users')];
                case 1:
                    dir = _a.sent();
                    return [2 /*return*/, dir];
            }
        });
    });
}
exports.getUsers = getUsers;
function getLoggedInUsers() {
    return Object.keys(storage_1.onlineUsers);
}
exports.getLoggedInUsers = getLoggedInUsers;
function loginUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUsers()];
                case 1:
                    users = _a.sent();
                    if (users.includes(params.name)) {
                        if (!config_2.allowDuplicateLogins && getLoggedInUsers().includes(params.name)) {
                            debug('user already logged in');
                            return [2 /*return*/, {
                                    success: false,
                                    status: 'LoginRefused',
                                    message: params.name + " already logged in elsewhere",
                                }];
                        }
                        doLoginUser(params.name);
                        return [2 /*return*/, {
                                success: true,
                                status: 'LoggedIn',
                                message: params.name + " successfully logged in",
                            }];
                    }
                    return [2 /*return*/, {
                            success: false,
                            status: 'UnknownUser',
                            message: "no user named " + params.name,
                        }];
            }
        });
    });
}
exports.loginUser = loginUser;
function doLoginUser(name) {
    var newSession = session_1.createSession(name);
    storage_1.sessions[newSession.id] = newSession;
    storage_1.onlineUsers[name] = {
        name: name,
        sessionId: newSession.id
    };
    debug(name + " connected");
    debug('online users:', Object.keys(storage_1.onlineUsers).length === 0 ? '<none>' : Object.keys(storage_1.onlineUsers).join());
}
function doLogoffUser(name) {
    if (!storage_1.onlineUsers[name])
        return;
    session_1.handleLogoffForSession(name, storage_1.onlineUsers[name].sessionId);
    delete storage_1.onlineUsers[name];
    debug(name + " disconnected.");
    debug('online users:', Object.keys(storage_1.onlineUsers).length === 0 ? '<none>' : Object.keys(storage_1.onlineUsers).join());
}
exports.doLogoffUser = doLogoffUser;
function signupUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUsers()];
                case 1:
                    users = _a.sent();
                    if (users.length >= config_1.maxUsers) {
                        return [2 /*return*/, {
                                success: false,
                                status: 'SignupRefused',
                                message: 'Maximum number of users has been reached.',
                            }];
                    }
                    if (users.includes(params.name)) {
                        return [2 /*return*/, {
                                success: false,
                                status: 'UserExists',
                                message: "user with name " + params.name + " already exists",
                            }];
                    }
                    return [4 /*yield*/, doSignup(params)];
                case 2:
                    _a.sent();
                    doLoginUser(params.name);
                    return [2 /*return*/, {
                            success: true,
                            status: 'SignedUp',
                            message: params.name + " successfully signed up",
                        }];
            }
        });
    });
}
exports.signupUser = signupUser;
function doSignup(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mkdir(dataPath_1.storageRoot + '/users/' + params.name)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mkdir(dataPath_1.storageRoot + '/users/' + params.name + '/scenes')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
