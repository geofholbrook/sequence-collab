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
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var users_1 = require("./users");
var dataPath_1 = require("./dataPath");
var debug_1 = __importDefault(require("debug"));
var scene_1 = require("./scene");
var session_1 = require("./session");
var debug = debug_1.default('sj:server:rest');
var app = express_1.default();
function initRestApi() {
    var _this = this;
    return new Promise(function (resolve) {
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.use(cors_1.default());
        if (!fs_1.default.existsSync(dataPath_1.storageRoot)) {
            fs_1.default.mkdirSync(dataPath_1.storageRoot);
            console.log(dataPath_1.storageRoot + ' created √');
            fs_1.default.mkdirSync(dataPath_1.storageRoot + '/users');
            console.log(dataPath_1.storageRoot + '/users created √');
        }
        else {
            // console.log(dataPath + ' exists √');
        }
        app.get('/api/users', function (req, res) {
            debug(req.hostname, 'requested', req.url);
            res.send(JSON.stringify(users_1.getUsersSync()));
            res.end();
        });
        app.post('/api/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = req.body;
                        debug(req.url, JSON.stringify(params));
                        return [4 /*yield*/, users_1.loginUser(params)];
                    case 1:
                        response = _a.sent();
                        res.end(JSON.stringify(response));
                        return [2 /*return*/];
                }
            });
        }); });
        createPostRoute('/api/signup', users_1.signupUser);
        createGetRoute('/api/users/online', users_1.getLoggedInUsers);
        createPostRoute('/api/scene/save', scene_1.serveSaveSceneRequest, false);
        createGetRoute('/api/scene/load', scene_1.serveLoadSceneRequest);
        createGetRoute('/api/request-invite-link', session_1.getInviteLink);
        createPostRoute('/api/request-session-entry', session_1.serveSessionEntryRequest);
        // ---------------------------------------------------------------------------
        // route helpers
        // ---------------------------------------------------------------------------
        function createGetRoute(url, getter, echo) {
            var _this = this;
            if (echo === void 0) { echo = true; }
            app.get(url, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (echo)
                                debug(req.hostname, 'GET', req.url);
                            return [4 /*yield*/, getter(req.query)];
                        case 1:
                            response = _a.sent();
                            res.end(JSON.stringify(response));
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        function createPostRoute(url, handler, echo) {
            var _this = this;
            if (echo === void 0) { echo = true; }
            app.post(url, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (echo)
                                debug(req.hostname, 'POST', req.url);
                            return [4 /*yield*/, handler(req.body)];
                        case 1:
                            response = _a.sent();
                            res.end(JSON.stringify(response));
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        app.listen(4040, function () {
            debug("REST server listening on port 4040");
            resolve(app);
        });
    });
}
exports.initRestApi = initRestApi;
