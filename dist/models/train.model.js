"use strict";
//Mongoose model for a collection --> trains
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainModel = void 0;
const mongoose_1 = require("mongoose");
const TrainSchema = new mongoose_1.Schema({
    trainNumber: { type: String, required: true },
    routeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'routes', required: true },
    destination: { type: String, required: true },
    no_of_coaches: { type: Number, required: true }
});
exports.TrainModel = (0, mongoose_1.model)('trains', TrainSchema);
//# sourceMappingURL=train.model.js.map