import { ServerRoute } from "@hapi/hapi";
import { bookingOperation } from "../controllers/booking.controller";
import Joi from 'joi';

const seatSchema = Joi.object({
    seatNumber: Joi.string().required()
});
const addBookingPayloadSchema = Joi.object({
    userId: Joi.string().required(),
    trainId: Joi.string().required(),
    coachId: Joi.string().required(),
    seats: Joi.array().items(seatSchema).min(1).required(),
    bookingDate: Joi.date().allow(null)
});

const bookingRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addBooking',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const bookingResponse = await bookingOperation.addBooking(detail);
            return bookingResponse;
        },
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate: {
                payload: addBookingPayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }

        },
    },
    {
        method: 'GET',
        path: '/bookingHistory',
        handler: async (req, h) => {
            const bookingId = req.query.id;
            const bookingResponse = await bookingOperation.bookingHistory(bookingId);
            return bookingResponse;
        },
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate:{
                query: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'Delete',
        path: '/cancelBooking',
        handler: async (req, h) => {
            const bookingId = req.query.id;
            const bookingResponse = await bookingOperation.cancelBooking(bookingId);
            return bookingResponse;
        },
        options: {
            auth: 'user',
            tags: ['api', 'booking'],
            validate:{
                query: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
    },
];
export default bookingRoutes;