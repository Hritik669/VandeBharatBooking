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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperation = void 0;
const user_model_1 = require("../models/user.model");
const session_model_1 = require("../models/session.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_controller_1 = require("./session.controller");
const redis_middleware_1 = require("../middleware/redis.middleware");
const decode_1 = require("../middleware/decode");
const response_1 = require("../core/response");
class UserOperation {
    static userSignUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = payload;
            try {
                const user = yield user_model_1.UserModel.findOne({ username: details.username });
                console.log("user  ", user);
                if (!user) {
                    const hashpassword = yield decode_1.Auth.generate_hash_pass(details.password);
                    const user_details = new user_model_1.UserModel({
                        username: details.username,
                        password: hashpassword,
                        email: details.email,
                        role: details.role,
                    });
                    const Details = yield user_details.save();
                    console.log(Details);
                    return response_1.Response.sendResponse("User Register Successfully", 201, {});
                }
                else {
                    console.log("user  12");
                    return response_1.Response.sendResponse("User already exist", 403, {});
                }
            }
            catch (err) {
                console.log("user  ", err);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static userLogin(email, role, password, device) {
        return __awaiter(this, void 0, void 0, function* () {
            const forToken = { email, role };
            try {
                const user = yield user_model_1.UserModel.findOne({ email });
                console.log(user);
                if (user) {
                    const userSession = yield session_model_1.SessionModel.findOne({ user_id: user._id });
                    console.log(userSession);
                    if (!(userSession === null || userSession === void 0 ? void 0 : userSession.status)) {
                        const hash = user.password;
                        if (yield bcrypt_1.default.compare(password, hash)) {
                            const token = jsonwebtoken_1.default.sign(forToken, process.env.SECRET_KEY);
                            console.log(token);
                            yield session_controller_1.Sessions.sessionEntry(device, user, userSession);
                            yield (0, redis_middleware_1.maintainSession)(user, device);
                            return response_1.Response.sendResponse("login successfully", 201, { user, token });
                        }
                        else {
                            return response_1.Response.sendResponse("password is incorrect", 404, {});
                        }
                    }
                    else {
                        return response_1.Response.sendResponse("User is already active", 404, {});
                    }
                }
                else {
                    return response_1.Response.sendResponse("user not found", 404, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static logout_user(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = yield decode_1.Auth.verify_token(token);
                const user = yield user_model_1.UserModel.findOne({ email: userToken.email });
                console.log(user);
                if (user) {
                    const userSession = yield session_model_1.SessionModel.findOne({ user_id: user.id });
                    console.log(userSession);
                    if (userSession) {
                        if (userSession.status) {
                            yield (0, redis_middleware_1.logout_session_redis)(user);
                            const updatedUserSession = yield session_model_1.SessionModel.findOneAndUpdate({ _id: userSession.id }, { status: !userSession.status });
                            console.log(updatedUserSession);
                            return response_1.Response.sendResponse("User logOut Successfully", 201, {});
                        }
                        else {
                            return response_1.Response.sendResponse("User is already inactive", 404, {});
                        }
                    }
                }
                else {
                    return response_1.Response.sendResponse("User not found", 404, {});
                }
            }
            catch (err) {
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
}
exports.UserOperation = UserOperation;
//# sourceMappingURL=user.controller.js.map