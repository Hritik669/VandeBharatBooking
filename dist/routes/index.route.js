"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_route_1 = __importDefault(require("./user.route"));
const stop_route_1 = __importDefault(require("./stop.route"));
const trainRoute_route_1 = __importDefault(require("./trainRoute.route"));
exports.routes = [...user_route_1.default, ...stop_route_1.default, ...trainRoute_route_1.default];
// let authSchema = [{
//     server.auth.scheme('jwt', (server, options) => {
//         return {
//             authenticate: (request, h) => {
//                 const authHeader = request.headers.authorization;
//                 if (!authHeader) {
//                     return h.unauthenticated({ message: 'Missing authentication token' });
//                 }
//                 const token = authHeader.replace('Bearer ', '');
//                 try {
//                     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//                     return h.authenticated({ credentials: decoded });
//                 } catch (err) {
//                     return h.unauthenticated({ message: 'Invalid authentication token' });
//                 }
//             }
//         };
//     });
// }]
//# sourceMappingURL=index.route.js.map