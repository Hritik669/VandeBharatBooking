import { ServerRoute } from '@hapi/hapi';
import { trainRouteOperation } from '../controllers/trainRoute.controller';
import Joi from 'joi';


const stopSchema = Joi.object({
    stopId: Joi.string().required(),
    order: Joi.number().integer().required()
});

const addRoutePayloadSchema = Joi.object({
    start_point: Joi.string().required(),
    stop_point: Joi.array().items(stopSchema).min(1).required(),
    end_point: Joi.string().required()
});

const routeRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addRoute',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const routeResponse = await trainRouteOperation.addTrainRoute(detail);
            return routeResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','trainroute'],
            validate: {
                payload: addRoutePayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getRoute',
        handler: async (req, h) => {
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = await trainRouteOperation.getTrainRoute(start,end);
            return routeResponse;
        },
        options: {
            auth: 'user',
            tags:['api','trainroute'],
            validate:{
                query: Joi.object({
                    start: Joi.string().required(),
                    end: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'DELETE',
        path: '/deleteRoute',
        handler: async (req, h) => {
            const start = req.query.start;
            const end = req.query.end;
            const routeResponse = await trainRouteOperation.deleteTrainRoute(start,end);
            return routeResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','trainroute'],
            validate:{
                query: Joi.object({
                    start: Joi.string().required(),
                    end: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'PUT',
        path: '/updateRoute',
        handler: async (req, h) => {
            const start = req.query.start;
            const end = req.query.end;
            const detail = req.payload as any;
            const routeResponse = await trainRouteOperation.updateRoute(start,end,detail);
            return routeResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','trainroute'],
            validate:{
                query: Joi.object({
                    start: Joi.string().required(),
                    end: Joi.string().required()
                }),
                payload: Joi.object({
                    start_point: Joi.string().required(),
                    stop_point: Joi.array().items(Joi.object({
                        stopId: Joi.string().required(),
                        order: Joi.number().integer().required()
                    })).min(1).required(),
                    end_point: Joi.string().required()
                }),
            }
        },
    },
];

export default routeRoutes;