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
exports.plugin = exports.userValidatePlugin = void 0;
const joi_1 = __importDefault(require("joi"));
const plugin = {
    name: 'userValidate',
    register: function (server, options) {
        return __awaiter(this, void 0, void 0, function* () {
            server.ext('onRequest', (request, h) => {
                const SingnUpschema = joi_1.default.object({
                    username: joi_1.default.string().min(3).max(30).required(),
                    password: joi_1.default.string().min(2).required(),
                    email: joi_1.default.string().email().lowercase().required(),
                    role: joi_1.default.string().valid("admin", "user"),
                });
                const result = SingnUpschema.validate(request.payload);
                if (result.error) {
                    return h.response({ message: "Invalid user input" }).code(400);
                }
                else {
                    return h.continue;
                }
            });
        });
    }
};
exports.plugin = plugin;
const userValidatePlugin = {
    name: 'userValidatePlugin',
    register: function (server, options) {
        return __awaiter(this, void 0, void 0, function* () {
            server.ext('onRequest', (request, h) => {
                const verifyLoginDetails = joi_1.default.object({
                    email: joi_1.default.string().email().required(),
                    password: joi_1.default.string().min(5).max(30).required(),
                });
                const result = verifyLoginDetails.validate(request.payload);
                if (result.error) {
                    return h.response({ message: 'Invalid user input' }).code(400);
                }
                else {
                    return h.continue;
                }
            });
        });
    },
};
exports.userValidatePlugin = userValidatePlugin;
//# sourceMappingURL=validation.js.map