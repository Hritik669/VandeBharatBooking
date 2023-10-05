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
exports.StopOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../const/response");
class StopOperation {
    static addStop(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingStop = yield models_1.StopModel.findOne({ stop_name: detail.stop_name });
                if (existingStop) {
                    return response_1.Response.sendResponse("Stop already exists", 403, {});
                }
                yield models_1.StopModel.create(detail);
                return response_1.Response.sendResponse("Stop registered successfully", 201, {});
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static getStop(stop) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stopDetail = yield models_1.StopModel.findOne({ stop_name: stop });
                if (!stopDetail) {
                    return response_1.Response.sendResponse("Stop doesn't exist", 403, {});
                }
                return response_1.Response.sendResponse("Stop detail", 201, { stopDetail });
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static deleteStop(stop) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stopName = yield models_1.StopModel.findOne({ stop_name: stop });
                if (stopName) {
                    yield models_1.StopModel.deleteOne({ stop_name: stop });
                    return response_1.Response.sendResponse("Stop delete successfully", 201, {});
                }
                else {
                    return response_1.Response.sendResponse("Stop doesn't exit", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static updateStop(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const stopNme = yield models_1.StopModel.findOne({ stop_name: detail.stop });
            if (stopNme) {
                yield models_1.StopModel.updateOne({ stop_name: detail.stop }, { stop_name: detail.newStop });
                return response_1.Response.sendResponse("Stop update successfully", 201, {});
            }
            else {
                return response_1.Response.sendResponse("Stop doesn't exit", 403, {});
            }
        });
    }
    catch(error) {
        console.log(error);
        return response_1.Response.sendResponse("Server error", 500, {});
    }
}
exports.StopOperation = StopOperation;
//# sourceMappingURL=stop.controller.js.map