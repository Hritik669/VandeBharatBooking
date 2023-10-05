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
exports.TrainOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../const/response");
class TrainOperation {
    static addTrain(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTrain = yield models_1.TrainModel.findOne({ trainNumber: detail.trainNumber });
                if (existingTrain) {
                    return response_1.Response.sendResponse("Train already exists", 403, {});
                }
                const newTrain = yield models_1.TrainModel.create(detail);
                return response_1.Response.sendResponse("Train registered successfully", 201, { train: newTrain });
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static trainRoute(trainNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const train = yield models_1.TrainModel.findOne({ trainNumber });
                if (!train) {
                    return response_1.Response.sendResponse("Train doesn't exist", 403, {});
                }
                const route = yield models_1.TrainRouteModel.findOne({ _id: train.routeId });
                return response_1.Response.sendResponse("Train is running on route", 201, { route });
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static getTrain(train) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const traindata = yield models_1.TrainModel.aggregate([
                    {
                        $match: { trainNumber: { $eq: train } }
                    },
                    {
                        $lookup: {
                            from: 'coaches',
                            localField: "_id",
                            foreignField: "trainId",
                            as: "Coaches"
                        }
                    },
                    {
                        $lookup: {
                            from: "trainroutes",
                            localField: "routeId",
                            foreignField: "_id",
                            as: "Train Route"
                        }
                    }
                ]);
                console.log(traindata);
                return response_1.Response.sendResponse("train detail", 201, { traindata });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static deleteTrain(train) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const traindata = yield models_1.TrainModel.findOne({ _id: train });
                if (traindata) {
                    yield models_1.TrainModel.deleteOne({ trainNumber: train });
                    return response_1.Response.sendResponse("Train Delete successfully", 201, {});
                }
                return response_1.Response.sendResponse("train doesn't exist", 403, {});
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static updateTrain(trainNumber, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const train = yield models_1.TrainModel.findOne({ _id: detail.trainNumber });
                if (train) {
                    const data = yield models_1.TrainModel.updateOne({ trainNumber: trainNumber }, {
                        $set: {
                            trainNumber: detail.trainNumber,
                            routeId: detail.routeId,
                            destination: detail.destination,
                            no_of_coaches: detail.no_of_coaches,
                        }
                    });
                    return response_1.Response.sendResponse("update successfully", 201, { data });
                }
                else {
                    return response_1.Response.sendResponse("train doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.TrainOperation = TrainOperation;
//# sourceMappingURL=train.controller.js.map