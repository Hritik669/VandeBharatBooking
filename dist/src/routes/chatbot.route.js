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
exports.ChatbotRoutes = void 0;
const joi_1 = __importDefault(require("joi"));
const chatbot_controller_1 = require("../chatbot/chatbot.controller");
exports.ChatbotRoutes = [
    {
        method: 'POST',
        path: '/chatbot',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const userInput = req.query.query;
            const response = yield chatbot_controller_1.chatbot.getReply(userInput);
            return response;
        }),
        options: {
            auth: false,
            tags: ['api', 'chatbot'],
            validate: {
                query: joi_1.default.object({
                    query: joi_1.default.string()
                }),
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        },
    },
];
//# sourceMappingURL=chatbot.route.js.map