import UserRoutes from "./user.route";
import StopRoutes from "./stop.route";
import routeRoutes from "./trainRoute.route";
import jwt from 'jsonwebtoken';
import { server } from "@hapi/hapi";
export let routes = [...UserRoutes, ...StopRoutes, ...routeRoutes];

// let authSchema = [{
//     server.auth.scheme('jwt', (server, options) => {
//         return {
//             authenticate: (request, h) => {
//                 const authHeader = request.headers.authorization;
//                 if (!authHeader) {
//                     return h.unauthenticated({ message: 'Missing authentication token' });
//                 }
//                 const token = authHeader.replace('Bearer ', '');
//                 try {
//                     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//                     return h.authenticated({ credentials: decoded });
//                 } catch (err) {
//                     return h.unauthenticated({ message: 'Invalid authentication token' });
//                 }
//             }
//         };
//     });
// }]
