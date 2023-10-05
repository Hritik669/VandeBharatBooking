import { ServerRoute } from "@hapi/hapi";
import { googleLogin, googleCallback } from "../google login/google.auth";
import Joi from 'joi';

export const GoogleRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/',
        handler: googleLogin,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: googleCallback,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    
];
