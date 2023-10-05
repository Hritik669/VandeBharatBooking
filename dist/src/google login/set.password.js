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
exports.Password = void 0;
const bcrypt = __importStar(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
const models_1 = require("../models");
const response_1 = require("../const/response");
class Password {
    static reset_password(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findOne({ email });
                if (!user) {
                    return response_1.Response.sendResponse('User not found', 404, {});
                }
                const temporaryPassword = yield generateTemporaryPassword();
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(temporaryPassword, saltRounds);
                yield models_1.UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
                sendResetPasswordEmail(email, temporaryPassword);
                return response_1.Response.sendResponse('Password reset email sent', 201, {});
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse('Internal Server Error', 500, {});
            }
        });
    }
}
exports.Password = Password;
function generateTemporaryPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const cryptoRandomStringModule = yield Promise.resolve().then(() => __importStar(require('crypto-random-string')));
        const temporaryPassword = cryptoRandomStringModule.default({ length: 12, type: 'url-safe' });
        return temporaryPassword;
    });
}
function sendResetPasswordEmail(email, temporaryPassword) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Password Reset',
        text: `Your temporary password is: ${temporaryPassword}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return response_1.Response.sendResponse('Error sending mail', 500, {});
        }
        else {
            console.log('Reset password email sent: ' + info.response);
            return response_1.Response.sendResponse('Mail sent', 201, {});
        }
    });
}
//# sourceMappingURL=set.password.js.map