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
exports.trainRouteOperation = void 0;
const response_1 = require("../core/response");
const models_1 = require("../models");
class trainRouteOperation {
    static addTrainRoute(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.TrainRouteModel.create(detail);
                return response_1.Response.sendResponse("TrainRoute register successfully", 201, {});
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
}
exports.trainRouteOperation = trainRouteOperation;
//# sourceMappingURL=trainRoute.controller.js.map