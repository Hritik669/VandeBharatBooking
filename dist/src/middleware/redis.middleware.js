"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_otp = exports.logout_session_redis = exports.maintainSession = void 0;
const redis = __importStar(require("redis"));
function maintainSession(user, device) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield redis.createClient();
            try {
                yield client.connect();
            }
            catch (err) {
                console.log(err);
            }
            if (user) {
                yield client.SET(user.id, JSON.stringify({
                    'user_id': user._id,
                    'device_id': device,
                    'status': true
                }));
                const redisSession = yield client.GET(user.id);
                console.log(redisSession);
            }
            else {
                console.log('User not found');
            }
        }
        catch (err) {
            console.log('Redis not set successfully', err);
        }
    });
}
exports.maintainSession = maintainSession;
function logout_session_redis(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user.email);
        try {
            const client = yield redis.createClient();
            try {
                yield client.connect();
            }
            catch (err) {
                console.log(err);
            }
            console.log(user.username);
            yield client.del(user.email);
            console.log("delete successfully");
        }
        catch (err) {
            console.log("error in deleting", err);
        }
    });
}
exports.logout_session_redis = logout_session_redis;
function get_otp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield redis.createClient();
        try {
            yield client.connect();
        }
        catch (err) {
            console.log(err);
        }
        const otp_details = yield client.get(email);
        console.log('----', otp_details);
        const userOTP = JSON.parse(otp_details);
        return otp_details;
    });
}
exports.get_otp = get_otp;
//# sourceMappingURL=redis.middleware.js.map