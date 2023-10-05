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
exports.Sessions = void 0;
const session_model_1 = require("../models/session.model");
const response_1 = require("../const/response");
class Sessions {
    static sessionEntry(device, user, userSession) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user) {
                    console.log("User not found");
                    return response_1.Response.sendResponse("User Not Found", 404, {});
                }
                if (!userSession) {
                    const sessionDetails = new session_model_1.SessionModel({
                        user_id: user.id,
                        device_id: device,
                        status: true
                    });
                    const session = yield sessionDetails.save();
                    console.log("Session stored successfully");
                    console.log(session);
                }
                else if (!userSession.status) {
                    yield session_model_1.SessionModel.findOneAndUpdate({ user_id: user.id }, { status: true });
                    console.log("Session Activate");
                }
            }
            catch (err) {
                console.error("Server Error", err);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
}
exports.Sessions = Sessions;
//# sourceMappingURL=session.controller.js.map