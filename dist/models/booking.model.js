"use strict";
//Mongoose model for a collection --> booking
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
    trainId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'trains', required: true },
    coachId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'coaches', required: true },
    seatId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'seats', required: true },
    bookingDate: { type: Date, required: true },
});
exports.BookingModel = (0, mongoose_1.model)('booking', bookingSchema);
//# sourceMappingURL=booking.model.js.map