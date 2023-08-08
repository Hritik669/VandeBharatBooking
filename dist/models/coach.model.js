"use strict";
//Mongoose model for a collection --> coaches
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachModel = void 0;
const mongoose_1 = require("mongoose");
const coachSchema = new mongoose_1.Schema({
    trainId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'trains', required: true },
    coachNumber: { type: String, required: true },
    no_of_seat: { type: Number, required: true },
    bookedSeats: { type: Number, required: true },
});
exports.CoachModel = (0, mongoose_1.model)('coaches', coachSchema);
//# sourceMappingURL=coach.model.js.map