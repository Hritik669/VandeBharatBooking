"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_route_1 = __importDefault(require("./user.route"));
const stop_route_1 = __importDefault(require("./stop.route"));
const trainRoute_route_1 = __importDefault(require("./trainRoute.route"));
const train_route_1 = __importDefault(require("./train.route"));
const coach_route_1 = __importDefault(require("./coach.route"));
const seat_route_1 = __importDefault(require("./seat.route"));
const booking_route_1 = __importDefault(require("./booking.route"));
const chatbot_route_1 = require("./chatbot.route");
const google_login_1 = require("./google.login");
exports.routes = [
    ...user_route_1.default,
    ...stop_route_1.default,
    ...trainRoute_route_1.default,
    ...train_route_1.default,
    ...coach_route_1.default,
    ...seat_route_1.default,
    ...booking_route_1.default,
    ...chatbot_route_1.ChatbotRoutes,
    ...google_login_1.GoogleRoutes
];
//# sourceMappingURL=index.route.js.map