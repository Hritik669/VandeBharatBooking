"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stop_controller_1 = require("../controllers/stop.controller");
const StopRoutes = [
    {
        method: 'POST',
        path: '/addStop',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const stopResponse = yield stop_controller_1.StopOperation.addStop(detail);
            return stopResponse;
        }),
        options: {
            auth: false,
        }
    }
];
exports.default = StopRoutes;
//# sourceMappingURL=stop.route.js.map