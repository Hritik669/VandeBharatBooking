import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { UserOperation } from '../controllers/user.controller';
import Joi from 'joi';
const UserRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/signup',
        handler: async (req, h) => {
            let payload = req.payload as any;
            console.log("In signup ", req)
            let responseData = await UserOperation.userSignUp(payload);
            console.log(" responseData in signup ", responseData)
            return responseData;
        },
        options: {
            auth:false,
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(3).max(30).required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().min(2).required(),
                    role: Joi.string().valid("admin", "user"),
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: async (req,h) => {
            const { email, role, password } = req.payload as any;
            const device = req.headers.device;
            let loginResponse = await UserOperation.userLogin(email, role, password,device);
            console.log("login response data",loginResponse);
            return loginResponse;
        },
        options: {
            auth:false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().min(2).required(),
                    role: Joi.string().valid("admin", "user"),
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: async (req,h) => {  
            const token = req.headers.authorization;
            let logoutResponse = await UserOperation.logout_user(token);
            return logoutResponse;
        }, 
        options:{
            auth:false,
        }
    }
];

export default UserRoutes;
