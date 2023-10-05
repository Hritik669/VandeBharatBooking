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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stop_controller_1 = require("../controllers/stop.controller");
const joi_1 = __importDefault(require("joi"));
const addStopPayloadSchema = joi_1.default.object({
    stop_name: joi_1.default.string().required()
});
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
            auth: 'admin',
            tags: ['api', 'stop'],
            validate: {
                payload: addStopPayloadSchema,
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/getStop',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const stop = req.query.stop;
            const stopResponse = yield stop_controller_1.StopOperation.getStop(stop);
            return stopResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'stop'],
            validate: {
                query: joi_1.default.object({
                    stop: joi_1.default.string().required(),
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/deleteStop',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const stop = req.query.stop;
            const stopResponse = yield stop_controller_1.StopOperation.deleteStop(stop);
            return stopResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'stop'],
            validate: {
                query: joi_1.default.object({
                    stop: joi_1.default.string().required(),
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/updateStop',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const stopResponse = yield stop_controller_1.StopOperation.updateStop(detail);
            return stopResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'stop'],
            validate: {
                payload: joi_1.default.object({
                    stop: joi_1.default.string().required(),
                    newStop: joi_1.default.string().required(),
                })
            }
        }
    }
];
exports.default = StopRoutes;
//# sourceMappingURL=stop.route.js.map