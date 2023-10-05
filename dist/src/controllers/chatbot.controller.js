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
exports.chatbot = void 0;
const training_data_1 = require("../const/training.data");
const response_1 = require("../const/response");
class chatbot {
    static getReply(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = training_data_1.classifier.classify(userInput);
            return response_1.Response.sendResponse(`${response}`, 203, { response });
        });
    }
}
exports.chatbot = chatbot;
//# sourceMappingURL=chatbot.controller.js.map