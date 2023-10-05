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
const coach_controller_1 = require("../controllers/coach.controller");
const joi_1 = __importDefault(require("joi"));
const addCoachPayloadSchema = joi_1.default.object({
    trainId: joi_1.default.string().required(),
    coachNumber: joi_1.default.string().required(),
    no_of_seat: joi_1.default.number().integer().min(0).required()
});
const coachRoutes = [
    {
        method: 'POST',
        path: '/addCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const coachResponse = yield coach_controller_1.CoachOperation.addCoach(detail);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate: {
                payload: addCoachPayloadSchema,
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        },
    },
    {
        method: 'GET',
        path: '/getCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const coach = req.query.coach;
            const coachResponse = yield coach_controller_1.CoachOperation.getCoach(coach);
            return coachResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'coach'],
            validate: {
                query: joi_1.default.object({
                    coach: joi_1.default.string().required()
                })
            }
        },
    },
    {
        method: 'DELETE',
        path: '/deleteCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const coach = req.query.coach;
            const coachResponse = yield coach_controller_1.CoachOperation.deleteCoach(coach);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate: {
                query: joi_1.default.object({
                    coach: joi_1.default.string().required()
                })
            }
        },
    },
    {
        method: 'PUT',
        path: '/updateCoach',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const coach = req.query.coach;
            const detail = req.payload;
            const coachResponse = yield coach_controller_1.CoachOperation.updateCoach(coach, detail);
            return coachResponse;
        }),
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate: {
                query: joi_1.default.object({
                    coach: joi_1.default.string().required()
                }),
                payload: addCoachPayloadSchema,
            }
        },
    },
];
exports.default = coachRoutes;
//# sourceMappingURL=coach.route.js.map