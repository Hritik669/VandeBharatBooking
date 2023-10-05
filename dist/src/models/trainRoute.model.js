"use strict";
//Mongoose model for a collection --> routes
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainRouteModel = void 0;
const mongoose_1 = require("mongoose");
;
const stopPointSchema = new mongoose_1.Schema({
    stopId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'stops', required: true },
    order: { type: Number, required: true }
});
const TrainRouteSchema = new mongoose_1.Schema({
    start_point: { type: String, required: true },
    stop_point: [stopPointSchema],
    end_point: { type: String, required: true }
});
exports.TrainRouteModel = (0, mongoose_1.model)('trainRoutes', TrainRouteSchema);
//# sourceMappingURL=trainRoute.model.js.map