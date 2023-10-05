import { ServerRoute } from "@hapi/hapi";
import Joi from 'joi';
import { chatbot } from "../chatbot/chatbot.controller";

export const ChatbotRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/chatbot',
        handler: async (req, h) => {
            const userInput = req.query.query;
            const response = await chatbot.getReply(userInput);
            return response;
        },
        options: {
            auth: false,
            tags: ['api', 'chatbot'],
            validate: {
                query:Joi.object({
                    query: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw err;
                }
            }

        },
    },
]