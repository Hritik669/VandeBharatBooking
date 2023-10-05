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
exports.seatOperation = void 0;
const models_1 = require("../models");
const response_1 = require("../const/response");
class seatOperation {
    static addSeat(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatdata = yield models_1.SeatModel.findOne({ coachId: detail.coachId, trainId: detail.trainId, seatNumber: detail.seatNumber });
                if (seatdata) {
                    return response_1.Response.sendResponse("Seat already exist", 201, {});
                }
                const seat = yield models_1.SeatModel.create(detail);
                return response_1.Response.sendResponse("Seat register successfully", 201, { seat });
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static getSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatdata = yield models_1.SeatModel.findOne({ seatNumber: seat });
                if (!seatdata) {
                    return response_1.Response.sendResponse("Seat doesn't exist", 403, {});
                }
                console.log(seatdata);
                return response_1.Response.sendResponse("Seat detail", 201, { seatdata });
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static deleteSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatdata = yield models_1.SeatModel.findOne({ _id: seat });
                if (seatdata) {
                    yield models_1.SeatModel.deleteOne({ seatNumber: seat });
                    return response_1.Response.sendResponse("seat delete successfully", 201, {});
                }
                return response_1.Response.sendResponse("Seat doesn't exist", 403, {});
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server Error", 500, {});
            }
        });
    }
    static updateSeat(seat, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const seatnum = yield models_1.SeatModel.findOne({ _id: seat });
            if (seatnum) {
                yield models_1.SeatModel.updateOne({ _id: seat }, {
                    $set: {
                        coachId: detail.coachId,
                        trainId: detail.trainId,
                        seatNumber: detail.seatNumber
                    }
                });
                return response_1.Response.sendResponse("Seat update successfully", 201, {});
            }
            else {
                return response_1.Response.sendResponse("seat doesn't exit", 403, {});
            }
        });
    }
    catch(error) {
        console.log(error);
        return response_1.Response.sendResponse("Server error", 500, {});
    }
}
exports.seatOperation = seatOperation;
//# sourceMappingURL=seat.controller.js.map