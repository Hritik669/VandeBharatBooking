"use strict";
//Mongoose model for a collection --> users
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String, enum: [UserRole.ADMIN, UserRole.USER],
        required: true
    },
});
exports.UserModel = (0, mongoose_1.model)('users', userSchema);
//# sourceMappingURL=user.model.js.map