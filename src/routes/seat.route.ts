import { ServerRoute } from "@hapi/hapi";
import { seatOperation } from "../controllers/seat.controller";
import Joi from 'joi';

const addSeatPayloadSchema = Joi.object({
    coachId: Joi.string().required(),
    trainId: Joi.string().required(),
    seatNumber: Joi.string().required()
});

const seatRoutes: ServerRoute[]=[
    {
        method:'POST',
        path: '/addSeat',
        handler: async (req,h)=>{
            const detail =req.payload as any;
            const seatResponse = await seatOperation.addSeat(detail);
            return seatResponse;
        },
        options: {
            auth: "admin",
            tags: ['api', 'seat'],
            validate: {
                payload: addSeatPayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        },
    },
    {
        method:'GET',
        path: '/getSeat',
        handler: async (req,h)=>{
            const seat =req.query.seat;
            const seatResponse = await seatOperation.getSeat(seat);
            return seatResponse;
        },
        options: {
            auth: "user",
            tags: ['api', 'seat'],
            validate: {
                query: Joi.object({
                    seat: Joi.string().required(), // Assuming 'seat' is the seat ID parameter
                })
            },
        },
    },
    {
        method:'DELETE',
        path: '/deleteSeat',
        handler: async (req,h)=>{
            const seat =req.query.seat;
            const seatResponse = await seatOperation.deleteSeat(seat);
            return seatResponse;
        },
        options: {
            auth: "admin",
            tags: ['api', 'seat'],
            validate: {
                query: Joi.object({
                    seat: Joi.string().required(), // Assuming 'seat' is the seat ID parameter
                })
            },
        },
    },
    {
        method:'PATCH',
        path: '/updateSeat',
        handler: async (req,h)=>{
            const seat =req.query.seat;
            const detail = req.payload as any;
            const seatResponse = await seatOperation.updateSeat(seat,detail);
            return seatResponse;
        },
        options: {
            auth: "admin",
            tags: ['api', 'seat'],
            validate: {
                payload: addSeatPayloadSchema, 
                query: Joi.object({
                    seat: Joi.string().required(), 
                }),
            },
        },
    },
];

export default seatRoutes;