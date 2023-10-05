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
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const session_model_1 = require("../models/session.model");
const plugin = {
    name: 'jwt-authentication',
    version: '1.0.0',
    register: function (server, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield server.register(Jwt);
            server.auth.strategy('admin', 'jwt', {
                key: secretKey,
                validate: (decoded, request, h) => __awaiter(this, void 0, void 0, function* () {
                    const sessionStatus = yield session_model_1.SessionModel.findOne({ userId: decoded.userId });
                    // console.log(sessionStatus);
                    if (!sessionStatus || sessionStatus.status == false) {
                        return { isValid: false };
                    }
                    if (decoded.role == "admin") {
                        return { isValid: true };
                    }
                    else {
                        return { isValid: false };
                    }
                }),
                verifyOptions: { algorithms: ['HS256'] },
            });
            server.auth.strategy('user', 'jwt', {
                key: secretKey,
                validate: (decoded) => __awaiter(this, void 0, void 0, function* () {
                    const sessionStatus = yield session_model_1.SessionModel.findOne({ userId: decoded.userId });
                    // console.log(sessionStatus);
                    if (!sessionStatus || sessionStatus.status == false) {
                        return { isValid: false };
                    }
                    if (decoded.role == "user") {
                        return { isValid: true };
                    }
                    else {
                        return { isValid: false };
                    }
                }),
                verifyOptions: { algorithms: ['HS256'] },
            });
            server.auth.default('admin', 'user');
            // server.auth.default('user');
        });
    },
};
exports.default = plugin;
// module.exports = plugin;
//# sourceMappingURL=authAdmin.js.map