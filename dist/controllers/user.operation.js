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
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserOperation {
    static userSignUp(req, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = req.payload;
            try {
                const user = yield user_model_1.UserModel.findOne({ username: details.username });
                console.log(user);
                if (!user) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hashpassword = yield bcrypt_1.default.hash(details.password, salt);
                    const user_details = new user_model_1.UserModel({
                        username: details.username,
                        password: hashpassword,
                        email: details.email,
                        role: details.role,
                    });
                    const Details = yield user_details.save();
                    console.log(Details);
                    return h.response({ status: "User Register Successfully" }).code(201);
                }
                else {
                    return h.response({ status: "User already exist" }).code(403);
                }
            }
            catch (err) {
                return h.response({ status: "Server Error" }).code(500);
            }
        });
    }
}
exports.UserOperation = UserOperation;
//# sourceMappingURL=user.operation.js.map