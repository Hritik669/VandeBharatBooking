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
const trainRoute_controller_1 = require("../controllers/trainRoute.controller");
const joi_1 = __importDefault(require("joi"));
const stopSchema = joi_1.default.object({
    stopId: joi_1.default.string().required(),
    order: joi_1.default.number().integer().required()
});
const addRoutePayloadSchema = joi_1.default.object({
    start_point: joi_1.default.string().required(),
    stop_point: joi_1.default.array().items(stopSchema).min(1).required(),
    end_point: joi_1.default.string().required()
});
const routeRoutes = [
    {
        method: 'POST',
        path: '/addRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.addTrainRoute(detail);
            return routeResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'trainroute'],
            validate: {
                payload: addRoutePayloadSchema,
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        },
    },
    {
        method: 'GET',
        path: '/getRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.getTrainRoute(start, end);
            return routeResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'trainroute'],
            validate: {
                query: joi_1.default.object({
                    start: joi_1.default.string().required(),
                    end: joi_1.default.string().required()
                })
            }
        },
    },
    {
        method: 'DELETE',
        path: '/deleteRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.deleteTrainRoute(start, end);
            return routeResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'trainroute'],
            validate: {
                query: joi_1.default.object({
                    start: joi_1.default.string().required(),
                    end: joi_1.default.string().required()
                })
            }
        },
    },
    {
        method: 'PUT',
        path: '/updateRoute',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const start = req.query.start;
            const end = req.query.end;
            const detail = req.payload;
            const routeResponse = yield trainRoute_controller_1.trainRouteOperation.updateRoute(start, end, detail);
            return routeResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'trainroute'],
            validate: {
                query: joi_1.default.object({
                    start: joi_1.default.string().required(),
                    end: joi_1.default.string().required()
                }),
                payload: joi_1.default.object({
                    start_point: joi_1.default.string().required(),
                    stop_point: joi_1.default.array().items(joi_1.default.object({
                        stopId: joi_1.default.string().required(),
                        order: joi_1.default.number().integer().required()
                    })).min(1).required(),
                    end_point: joi_1.default.string().required()
                }),
            }
        },
    },
];
exports.default = routeRoutes;
//# sourceMappingURL=trainRoute.route.js.map