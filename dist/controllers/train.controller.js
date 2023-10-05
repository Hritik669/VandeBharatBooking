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
exports.trainOperatio = void 0;
const models_1 = require("../models");
class trainOperatio {
    static createTrain(req, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const detail = req.payload;
            try {
                const train = yield models_1.TrainModel.findOne({ trainNumber: detail.trainNumber });
                console.log(train);
                if (!train) {
                    yield models_1.TrainModel.create(detail);
                    return h.response({ status: "train register successfully" }).code(201);
                }
                else {
                    return h.response({ status: "train already exit" }).code(403);
                }
            }
            catch (error) {
                console.log(error);
                return h.response({ status: "Server Error" }).code(500);
            }
        });
    }
}
exports.trainOperatio = trainOperatio;
//# sourceMappingURL=train.controller.js.map