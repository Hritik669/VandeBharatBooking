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
const booking_controller_1 = require("../controllers/booking.controller");
const joi_1 = __importDefault(require("joi"));
const seatSchema = joi_1.default.object({
    seatNumber: joi_1.default.string().required()
});
const addBookingPayloadSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    trainId: joi_1.default.string().required(),
    coachId: joi_1.default.string().required(),
    seats: joi_1.default.array().items(seatSchema).min(1).required(),
    bookingDate: joi_1.default.date().allow(null)
});
const bookingRoutes = [
    {
        method: 'POST',
        path: '/addBooking',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = req.payload;
            const bookingResponse = yield booking_controller_1.bookingOperation.addBooking(detail);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate: {
                payload: addBookingPayloadSchema,
                failAction: (request, h, err) => __awaiter(void 0, void 0, void 0, function* () {
                    throw err;
                })
            }
        },
    },
    {
        method: 'GET',
        path: '/bookingHistory',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const bookingId = req.query.id;
            const bookingResponse = yield booking_controller_1.bookingOperation.bookingHistory(bookingId);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate: {
                query: joi_1.default.object({
                    id: joi_1.default.string().required()
                })
            }
        },
    },
    {
        method: 'Delete',
        path: '/cancelBooking',
        handler: (req, h) => __awaiter(void 0, void 0, void 0, function* () {
            const bookingId = req.query.id;
            const bookingResponse = yield booking_controller_1.bookingOperation.cancelBooking(bookingId);
            return bookingResponse;
        }),
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate: {
                query: joi_1.default.object({
                    id: joi_1.default.string().required()
                })
            }
        },
    },
];
exports.default = bookingRoutes;
//# sourceMappingURL=booking.route.js.map