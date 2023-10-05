import { ServerRoute } from '@hapi/hapi';
import { StopOperation } from '../controllers/stop.controller';
import Joi from 'joi';

const addStopPayloadSchema = Joi.object({
    stop_name: Joi.string().required()
});

const StopRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addStop',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const stopResponse = await StopOperation.addStop(detail);
            return stopResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'stop'],
            validate: {
                payload: addStopPayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/getStop',
        handler: async (req, h) => {
            const stop = req.query.stop;
            const stopResponse = await StopOperation.getStop(stop);
            return stopResponse;
        },
        options: {
            auth: 'user',
            tags: ['api', 'stop'],
            validate:{
                query: Joi.object({
                    stop: Joi.string().required(),
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/deleteStop',
        handler: async (req, h) => {
            const stop = req.query.stop;
            const stopResponse = await StopOperation.deleteStop(stop);
            return stopResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'stop'],
            validate:{
                query: Joi.object({
                    stop: Joi.string().required(),
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/updateStop',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const stopResponse = await StopOperation.updateStop(detail);
            return stopResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'stop'],
            validate:{
                payload: Joi.object({
                    stop: Joi.string().required(),
                    newStop: Joi.string().required(),
                })
            }
        }
    }
]

export default StopRoutes;