import { ServerRoute } from '@hapi/hapi';
import { TrainOperation } from '../controllers/train.controller';
import Joi from 'joi';

const addTrainPayloadSchema = Joi.object({
    trainNumber: Joi.string().required(),
    routeId: Joi.string().required(),
    destination: Joi.string().required(),
    no_of_coaches: Joi.number().integer().min(0).required()
});

const trainRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addTrain',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const trainResponse = await TrainOperation.addTrain(detail);
            return trainResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','train'],
            validate: {
                payload: addTrainPayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getTrain',
        handler: async (req, h) => {
            const train = req.query.train;
            const trainResponse = await TrainOperation.getTrain(train);
            return trainResponse;
        },
        options: {
            auth: 'user',
            tags:['api','train'],
            validate:{
                query: Joi.object({
                    train: Joi.string().required(),
                })
            }
        },
    },
    {
        method: 'GET',
        path: '/getTrainRoute',
        handler: async (req, h) => {
            const trainNumber = req.query.train;
            const trainResponse = await TrainOperation.trainRoute(trainNumber);
            return trainResponse;
        },
        options: {
            auth: 'user',
            tags:['api','train'],
            validate:{
                query: Joi.object({
                    train: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'DELETE',
        path: '/deleteTrain',
        handler: async (req, h) => {
            const trainNumber = req.query.train;
            const trainResponse = await TrainOperation.deleteTrain(trainNumber);
            return trainResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','train'],
            validate:{
                query: Joi.object({
                    train: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'PUT',
        path: '/updateTrain',
        handler: async (req, h) => {
            const trainNumber = req.query.train;
            const detail = req.payload as any;
            const trainResponse = await TrainOperation.updateTrain(trainNumber, detail);
            return trainResponse;
        },
        options: {
            auth: 'admin',
            tags:['api','train'],
            validate:{
                query: Joi.object({
                    train: Joi.string().required()
                }),
                payload: addTrainPayloadSchema,
            }
        },
    },
];

export default trainRoutes;