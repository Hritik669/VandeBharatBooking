"use strict";
//Mongoose model for a collection --> seats
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatModel = void 0;
const mongoose_1 = require("mongoose");
const seatSchema = new mongoose_1.Schema({
    coachId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'coaches', required: true },
    seatNumber: { type: String, required: true },
    isBooked: { type: Boolean, required: true },
});
exports.SeatModel = (0, mongoose_1.model)('seats', seatSchema);
//# sourceMappingURL=seat.model.js.map