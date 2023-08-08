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
const UserRoutes = [
    {
        method: 'POST',
        path: '/signup',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            let payload = req.payload;
            console.log("In signup ", req);
            let responseData = yield user_controller_1.UserOperation.userSignUp(payload);
            console.log(" responseData in signup ", responseData);
            return responseData;
        }),
        options: {
            auth: false,
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().min(3).max(30).required(),
                    email: joi_1.default.string().email().lowercase().required(),
                    password: joi_1.default.string().min(2).required(),
                    role: joi_1.default.string().valid("admin", "user"),
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, role, password } = req.payload;
            const device = req.headers.device;
            let loginResponse = yield user_controller_1.UserOperation.userLogin(email, role, password, device);
            console.log("login response data", loginResponse);
            return loginResponse;
        }),
        options: {
            auth: false,
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().email().lowercase().required(),
                    password: joi_1.default.string().min(2).required(),
                    role: joi_1.default.string().valid("admin", "user"),
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
        }
    }
];
exports.default = UserRoutes;
//# sourceMappingURL=user.route.js.map