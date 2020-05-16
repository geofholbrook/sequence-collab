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
var uuid_1 = require("uuid");
var storage_1 = require("./storage");
var scene_1 = require("./scene");
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default('sj:server');
function createSession(hostUsername) {
    return {
        id: uuid_1.v1(),
        host: hostUsername,
        guests: [],
        createdStamp: Date.now(),
    };
}
exports.createSession = createSession;
function getInviteLink(params) {
    return __awaiter(this, void 0, void 0, function () {
        var host;
        return __generator(this, function (_a) {
            host = storage_1.onlineUsers[params.hostUsername];
            if (!host) {
                return [2 /*return*/, {
                        success: false,
                        status: 'NoLinkGenerated',
                        message: 'I\'m sorry, you don\'t appear to be logged in ...',
                    }];
            }
            return [2 /*return*/, {
                    success: true,
                    status: 'ValidLink',
                    message: 'Link generated.',
                    link: "https://jammr.io?invite=" + host.sessionId
                }];
        });
    });
}
exports.getInviteLink = getInviteLink;
function serveSessionEntryRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        var session, guest, hostScene;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = storage_1.sessions[params.sessionId];
                    if (!session) {
                        return [2 /*return*/, {
                                success: false,
                                message: 'Session not found.',
                            }];
                    }
                    guest = Object.values(storage_1.onlineUsers).find(function (user) { return user.name === params.guest; });
                    if (!guest) {
                        return [2 /*return*/, {
                                success: false,
                                message: 'You don\'t appear to be logged in.'
                            }];
                    }
                    return [4 /*yield*/, scene_1.loadScene(scene_1.getScenePath(storage_1.onlineUsers[session.host].name, 'temp'))];
                case 1:
                    hostScene = _a.sent();
                    if (!hostScene) {
                        return [2 /*return*/, {
                                success: false,
                                message: 'Host session can\'t be loaded.'
                            }];
                    }
                    session.guests.push(params.guest);
                    guest.sessionId = params.sessionId;
                    return [2 /*return*/, {
                            success: true,
                            message: 'Entry granted, host session loaded',
                            scene: hostScene
                        }];
            }
        });
    });
}
exports.serveSessionEntryRequest = serveSessionEntryRequest;
function handleLogoffForSession(loggingOffUser, sessionId) {
    debug('handleLogoffForSession', loggingOffUser, sessionId);
    var session = storage_1.sessions[sessionId];
    if (session.host === loggingOffUser) {
        console.log(session);
        if (session.guests.length === 0) {
            delete storage_1.sessions[sessionId];
        }
        else {
            // if host leaves, make one of the guests the host
            session.host = session.guests.shift();
        }
        console.log({ after: session });
    }
    else {
        session.guests = session.guests.filter(function (guest) { return guest === loggingOffUser; });
    }
}
exports.handleLogoffForSession = handleLogoffForSession;
