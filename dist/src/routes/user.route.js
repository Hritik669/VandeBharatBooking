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
const user_controller_1 = require("../controllers/user.controller");
const joi_1 = __importDefault(require("joi"));
const logging_colorify_1 = require("logging-colorify");
const UserRoutes = [
    {
        method: 'POST',
        path: '/signup',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, logging_colorify_1.createApiLogger)(req);
            let payload = req.payload;
            console.log("In signup ", req);
            let responseData = yield user_controller_1.UserOperation.userSignUp(payload);
            console.log(" responseData in signup ", responseData);
            return responseData;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().min(3).max(30).required(),
                    email: joi_1.default.string().email().lowercase().required(),
                    password: joi_1.default.string().min(2).required(),
                    role: joi_1.default.string().valid("admin", "user"),
                }),
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = req.payload;
            const device = req.headers.device;
            let loginResponse = yield user_controller_1.UserOperation.userLogin(email, password, device);
            console.log("login response data", loginResponse);
            return loginResponse;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().email().lowercase().required(),
                    password: joi_1.default.string().min(2).required(),
                }),
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization;
            let logoutResponse = yield user_controller_1.UserOperation.logout_user(token);
            return logoutResponse;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                headers: joi_1.default.object({
                    authorization: joi_1.default.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'GET',
        path: '/getUser',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization;
            let Response = yield user_controller_1.UserOperation.getUser(token);
            return Response;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                headers: joi_1.default.object({
                    authorization: joi_1.default.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'POST',
        path: '/changePassword',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, previousPassword, newPassword } = req.payload;
            let Response = yield user_controller_1.UserOperation.change_password(email, previousPassword, newPassword);
            console.log("change response data", Response);
            return Response;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().email().lowercase().required(),
                    previousPassword: joi_1.default.string().min(2).required(),
                    newPassword: joi_1.default.string().min(2).required(),
                }),
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/forgotPassword',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            // const email = req.payload;
            let Response = yield user_controller_1.UserOperation.forgotPassword(req.payload);
            return Response;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'POST',
        path: '/resetPassword',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            let Response = yield user_controller_1.UserOperation.reset_password(req.payload);
            return Response;
        }),
        options: {
            auth: false,
            tags: ['api', 'user'],
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().required(),
                    otp: joi_1.default.string().required(),
                    newPassword: joi_1.default.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
];
exports.default = UserRoutes;
//# sourceMappingURL=user.route.js.map