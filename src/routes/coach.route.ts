import { ServerRoute } from '@hapi/hapi';
import { CoachOperation } from '../controllers/coach.controller';
import Joi from 'joi';

const addCoachPayloadSchema = Joi.object({
    trainId: Joi.string().required(),
    coachNumber: Joi.string().required(),
    no_of_seat: Joi.number().integer().min(0).required()
});

const coachRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/addCoach',
        handler: async (req, h) => {
            const detail = req.payload as any;
            const coachResponse = await CoachOperation.addCoach(detail);
            return coachResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate: {
                payload: addCoachPayloadSchema,
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/getCoach',
        handler: async (req, h) => {
            const coach = req.query.coach;
            const coachResponse = await CoachOperation.getCoach(coach);
            return coachResponse;
        },
        options: {
            auth: 'user',
            tags: ['api', 'coach'],
            validate:{
                query: Joi.object({
                    coach: Joi.string().required()
                })
            }
        },
    },
   
    {
        method: 'DELETE',
        path: '/deleteCoach',
        handler: async (req, h) => {
            const coach = req.query.coach;
            const coachResponse = await CoachOperation.deleteCoach(coach);
            return coachResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate:{
                query: Joi.object({
                    coach: Joi.string().required()
                })
            }
        },
    },
    {
        method: 'PUT',
        path: '/updateCoach',
        handler: async (req, h) => {
            const coach = req.query.coach;
            const detail = req.payload as any;
            const coachResponse = await CoachOperation.updateCoach(coach,detail);
            return coachResponse;
        },
        options: {
            auth: 'admin',
            tags: ['api', 'coach'],
            validate:{
                query: Joi.object({
                    coach: Joi.string().required()
                }),
                payload: addCoachPayloadSchema,
            }
        },
    },
];

export default coachRoutes;