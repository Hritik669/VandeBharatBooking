"use strict";
//Mongoose model for a collection --> sessions
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
    device_id: { type: String },
    status: { type: Boolean, required: true }
});
exports.SessionModel = (0, mongoose_1.model)('session', SessionSchema);
//# sourceMappingURL=session.model.js.map