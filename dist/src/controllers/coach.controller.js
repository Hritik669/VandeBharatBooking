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
exports.CoachOperation = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const response_1 = require("../const/response");
class CoachOperation {
    static addCoach(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainId = detail.trainId;
                const [existingCoach, train] = yield Promise.all([
                    models_1.CoachModel.findOne({ coachNumber: detail.coachNumber, trainId }),
                    models_2.TrainModel.findOne({ _id: trainId }),
                ]);
                if (train.no_of_coaches >= 8 || existingCoach) {
                    return response_1.Response.sendResponse("Number of coaches should be less than 8 or coach already exists", 403, {});
                }
                else {
                    const coachData = yield models_1.CoachModel.create(detail);
                    const updatedTrain = yield models_2.TrainModel.findOneAndUpdate({ _id: trainId }, { $inc: { no_of_coaches: 1 } });
                    return response_1.Response.sendResponse("Coach registered successfully", 201, { coachData, updatedTrain });
                }
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static deleteCoach(coach) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coachData = yield models_1.CoachModel.findOne({ coachNumber: coach });
                const trainId = coachData.trainId;
                const train = yield models_2.TrainModel.findOne({ _id: trainId });
                if (coachData) {
                    const deletedCoach = yield models_1.CoachModel.deleteOne({ coachNumber: coach });
                    const updatedTrain = yield models_2.TrainModel.findOneAndUpdate({ _id: trainId }, { $inc: { no_of_coaches: -1 } });
                    return response_1.Response.sendResponse("Coach deleted successfully", 201, { deletedCoach, updatedTrain });
                }
                return response_1.Response.sendResponse("Coach doesn't exist", 403, {});
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static updateCoach(coach, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCoach = yield models_1.CoachModel.findOne({ _id: coach });
                if (existingCoach) {
                    const updatedCoach = yield models_1.CoachModel.updateOne({ _id: coach }, {
                        $set: {
                            trainId: detail.trainId,
                            coachNumber: detail.coachNumber,
                            no_of_seat: detail.no_of_seat,
                        },
                    });
                    return response_1.Response.sendResponse("Coach updated successfully", 201, { updatedCoach });
                }
                else {
                    return response_1.Response.sendResponse("Coach doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.error(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
    static getCoach(coach) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coachdata = yield models_1.CoachModel.aggregate([
                    {
                        $match: { coachNumber: { $eq: coach } }
                    },
                    {
                        $lookup: {
                            from: 'seats',
                            localField: '_id',
                            foreignField: 'coachId',
                            as: 'Seats'
                        }
                    }
                ]);
                console.log(JSON.stringify(coachdata));
                if (coachdata) {
                    return response_1.Response.sendResponse("coach detail", 201, { coachdata });
                }
                else {
                    return response_1.Response.sendResponse("coach doesn't exist", 403, {});
                }
            }
            catch (error) {
                console.log(error);
                return response_1.Response.sendResponse("Server error", 500, {});
            }
        });
    }
}
exports.CoachOperation = CoachOperation;
// static async trainDetail(coachId, routeId) {
//   try {
//     const coach = await CoachModel.findOne({_id: coachId });
//     console.log(coach);
//     let detailData = [coach.trainId, coach.coachNumber, coach.no_of_seat];
//     detailData = detailData.map((data, index) => {
//       let message = "";
//       switch (index) {
//         case 0:
//           message = `Train ID: ${data}`;
//           break;
//         case 1:
//           message = `Coach Number: ${data}`;
//           break;
//         case 2:
//           message = `Total number of Seats: ${data}`;
//           break;
//         default:
//           message = `Unknown data: ${data}`;
//       }
//       return message;
//     })
//     console.log(detailData);
//     return Response.sendResponse("Train deatails", 201, { detailData });
//   }
//   catch (error) {
//     console.log(error);
//     return Response.sendResponse("Server error", 500, {});
//   }
// }
//# sourceMappingURL=coach.controller.js.map