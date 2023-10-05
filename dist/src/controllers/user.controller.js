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
const redis_middleware_1 = require("../redis/redis.middleware");
const decode_1 = require("../middleware/decode");
const response_1 = require("../const/response");
const redis = __importStar(require("redis"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserOperation {
    static userSignUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email, role } = payload;
                const existingUser = yield user_model_1.UserModel.findOne({ username, password, email, role });
                if (existingUser) {
                    return response_1.Response.sendResponse("User already exists", 403, {});
                }
                const userWithoutPassword = yield user_model_1.UserModel.findOne({ email });
                const hashpassword = yield decode_1.Auth.generate_hash_pass(password);
                if (userWithoutPassword) {
                    let data = yield user_model_1.UserModel.updateOne({ email }, {
                        $set: {
                            password: hashpassword
                        }
                    });
                    return response_1.Response.sendResponse("User Register Successfully", 201, { data });
                }
                else {
                    const user_details = new user_model_1.UserModel({ username, password: hashpassword, email, role });
                    const userDetails = yield user_details.save();
                    return response_1.Response.sendResponse("User Register Successfully", 201, { userDetails });
                }
            }
            catch (error) {
                console.error("userSignUp error: ", error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static userLogin(email, password, device) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserModel.findOne({ email, password });
                if (!user) {
                    return response_1.Response.sendResponse("User not found or you sign in through google please signup first", 404, {});
                }
                const userSession = yield session_model_1.SessionModel.findOne({ user_id: user._id });
                if (userSession === null || userSession === void 0 ? void 0 : userSession.status) {
                    return response_1.Response.sendResponse("User is already active", 404, {});
                }
                const hash = user.password;
                const passwordMatch = yield bcrypt_1.default.compare(password, hash);
                if (!passwordMatch) {
                    return response_1.Response.sendResponse("Password is incorrect", 404, {});
                }
                const forToken = { email, role: user.role };
                const token = jsonwebtoken_1.default.sign(forToken, process.env.SECRET_KEY, { expiresIn: '10h' });
                yield session_controller_1.Sessions.sessionEntry(device, user, userSession);
                yield (0, redis_middleware_1.maintainSession)(user, device);
                return response_1.Response.sendResponse("Login successfully", 201, { user, token });
            }
            catch (error) {
                console.error("userLogin error: ", error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static logout_user(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = yield decode_1.Auth.verify_token(token);
                const user = yield user_model_1.UserModel.findOne({ email: userToken.email });
                if (!user) {
                    return response_1.Response.sendResponse("User not found", 404, {});
                }
                const userSession = yield session_model_1.SessionModel.findOne({ user_id: user._id });
                if (!userSession || !userSession.status) {
                    return response_1.Response.sendResponse("User is already inactive", 404, {});
                }
                yield (0, redis_middleware_1.logout_session_redis)(user);
                yield session_model_1.SessionModel.findOneAndUpdate({ _id: userSession._id }, { status: !userSession.status });
                return response_1.Response.sendResponse("User logOut Successfully", 201, {});
            }
            catch (error) {
                console.error("logout_user error: ", error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = yield decode_1.Auth.verify_token(token);
                const user = yield user_model_1.UserModel.findOne({ email: userToken.email });
                if (!user) {
                    return response_1.Response.sendResponse("User doesn't exist", 403, {});
                }
                return response_1.Response.sendResponse("User detail", 201, { user });
            }
            catch (error) {
                console.error("getUser error: ", error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static change_password(email, previousPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserModel.findOne({ email });
                if (!user) {
                    return response_1.Response.sendResponse('User not found', 404, {});
                }
                const passwordMatch = yield bcrypt_1.default.compare(previousPassword, user.password);
                if (!passwordMatch) {
                    return response_1.Response.sendResponse('Incorrect previous password', 400, {});
                }
                if (newPassword === previousPassword) {
                    return response_1.Response.sendResponse('New password cannot be the same as the previous password', 400, {});
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
                yield user_model_1.UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
                return response_1.Response.sendResponse('Password changed successfully', 200, {});
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse('Internal Server Error', 500, {});
            }
        });
    }
    static forgotPassword(details) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const client = yield redis.createClient();
                    yield client.connect();
                    const user = yield user_model_1.UserModel.findOne({ email: details.email });
                    console.log(user);
                    if (!user) {
                        return 0;
                    }
                    let OTP = Math.floor(1000 + Math.random() * 9000);
                    const options = { EX: 100 };
                    yield client.set(details.email, OTP.toString(), options);
                    console.log("otp set to redis");
                    const transporter = nodemailer_1.default.createTransport({
                        service: "gmail",
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.EMAIL_ADDRESS,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    });
                    const mailOptions = {
                        from: process.env.EMAIL_ADDRESS,
                        to: details.email,
                        subject: 'Password Reset Request',
                        text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
                Please paste this into your browser to complete the process:\n\n
                ${process.env.CLIENT_URL}/RESET PASSWORD OTP: ${OTP}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return resolve(response_1.Response.sendResponse("error sending mail", 500, {}));
                        }
                        else {
                            console.log("Email sent: " + info.response);
                            return resolve(response_1.Response.sendResponse("mail send", 201, {}));
                        }
                    });
                }
                catch (err) {
                    return resolve(response_1.Response.sendResponse("Server Error", 500, {}));
                }
            }));
        });
    }
    static reset_password(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield user_model_1.UserModel.findOne({ email: payload.email });
                    if (!user) {
                        return resolve(response_1.Response.sendResponse("Invalid User", 403, {}));
                    }
                    const userOTP = yield (0, redis_middleware_1.get_otp)(payload.email);
                    console.log("--------", userOTP);
                    if (!userOTP || userOTP !== payload.otp) {
                        return resolve(response_1.Response.sendResponse("Invalid OTP", 403, {}));
                    }
                    console.log(user.password);
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hashpassword = yield bcrypt_1.default.hash(payload.newPassword, salt);
                    user.password = hashpassword;
                    console.log(user.password);
                    const updatedUser = yield user.save();
                    if (updatedUser) {
                        (0, redis_middleware_1.del_otp)(payload.email);
                    }
                    return resolve(response_1.Response.sendResponse("password reset successfully", 201, {}));
                }
                catch (error) {
                    console.log(error);
                    return resolve(response_1.Response.sendResponse("Server error", 500, {}));
                }
            }));
        });
    }
}
exports.UserOperation = UserOperation;
//# sourceMappingURL=user.controller.js.map