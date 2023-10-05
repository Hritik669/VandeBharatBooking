import { ServerRoute } from '@hapi/hapi';
import { UserOperation } from '../controllers/user.controller';
import Joi from 'joi';
import { createApiLogger } from 'logging-colorify';

const UserRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/signup',
        handler: async (req, h) => {
            await createApiLogger(req);
            let payload = req.payload as any;
            console.log("In signup ", req)
            let responseData = await UserOperation.userSignUp(payload);
            console.log(" responseData in signup ", responseData)
            return responseData;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(3).max(30).required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().min(2).required(),
                    role: Joi.string().valid("admin", "user"),
                }),
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: async (req, h) => {
            const { email, password } = req.payload as any;
            const device = req.headers.device;
            let loginResponse = await UserOperation.userLogin(email, password, device);
            console.log("login response data", loginResponse);
            return loginResponse;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().min(2).required(),
                }),
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: async (req, h) => {
            const token = req.headers.authorization;
            let logoutResponse = await UserOperation.logout_user(token);
            return logoutResponse;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'GET',
        path: '/getUser',
        handler: async (req, h) => {
            const token = req.headers.authorization;
            let Response = await UserOperation.getUser(token);
            return Response;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'POST',
        path: '/changePassword',
        handler: async (req, h) => {
            const { email, previousPassword, newPassword } = req.payload as any;
            let Response = await UserOperation.change_password(email,previousPassword,newPassword);
            console.log("change response data", Response);
            return Response;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().required(),
                    previousPassword: Joi.string().min(2).required(),
                    newPassword: Joi.string().min(2).required(),
                }),
                failAction: async (request, h, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/forgotPassword',
        handler: async (req, h) => {
            // const email = req.payload;
            let Response = await UserOperation.forgotPassword(req.payload);
            return Response;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
    {
        method: 'POST',
        path: '/resetPassword',
        handler: async (req, h) => {
            let Response = await UserOperation.reset_password(req.payload);
            return Response;
        },
        options: {
            auth: false,
            tags:['api','user'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    otp: Joi.string().required(),
                    newPassword: Joi.string().required()
                }).options({ allowUnknown: true })
            }
        }
    },
       
];

export default UserRoutes;