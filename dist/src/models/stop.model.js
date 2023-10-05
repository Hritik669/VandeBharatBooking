"use strict";
//Mongoose model for a collection --> stops
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopModel = void 0;
const mongoose_1 = require("mongoose");
const StopSchema = new mongoose_1.Schema({
    stop_name: { type: String, required: true }
});
exports.StopModel = (0, mongoose_1.model)('stops', StopSchema);
//# sourceMappingURL=stop.model.js.map