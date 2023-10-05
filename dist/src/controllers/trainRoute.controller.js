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
const response_1 = require("../const/response");
const models_1 = require("../models");
class trainRouteOperation {
    static addTrainRoute(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRoute = yield models_1.TrainRouteModel.findOne({ start_point: detail.start_point, end_point: detail.end_point });
                if (existingRoute) {
                    return response_1.Response.sendResponse("Route already exists", 403, {});
                }
                yield models_1.TrainRouteModel.create(detail);
                return response_1.Response.sendResponse("TrainRoute registered successfully", 201, {});
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static getTrainRoute(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(start, end);
                const route = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                if (route) {
                    const routeData = yield models_1.TrainRouteModel.aggregate([
                        {
                            $match: { start_point: start, end_point: end }
                        },
                        {
                            $lookup: {
                                from: 'trains',
                                localField: '_id',
                                foreignField: 'routeId',
                                as: 'Trains in the route'
                            }
                        }
                    ]);
                    console.log(routeData);
                    return response_1.Response.sendResponse("TrainRoute route detail", 201, { routeData });
                }
                else {
                    return response_1.Response.sendResponse("Route doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static deleteTrainRoute(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routedata = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                if (routedata) {
                    yield models_1.TrainRouteModel.deleteOne({ start_point: start, end_point: end });
                    return response_1.Response.sendResponse("Trainroute delete successfully", 201, {});
                }
                else {
                    return response_1.Response.sendResponse("route doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static updateRoute(start, end, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const routedata = yield models_1.TrainRouteModel.findOne({ start_point: start, end_point: end });
                if (routedata) {
                    let data = yield models_1.TrainRouteModel.updateOne({ start_point: start, end_point: end }, {
                        $set: {
                            start_point: detail.start_point,
                            stop_point: detail.stop_point,
                            end_point: detail.end_point
                        }
                    });
                    return response_1.Response.sendResponse("route updated successfully", 201, { data });
                }
                else {
                    return response_1.Response.sendResponse("route doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.trainRouteOperation = trainRouteOperation;
//# sourceMappingURL=trainRoute.controller.js.map