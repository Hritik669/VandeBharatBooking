import { ServerRoute } from '@hapi/hapi';
import { trainRouteOperation } from '../controllers/trainRoute.controller';

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
            auth: 'jwt',
        },
    },
];

export default routeRoutes;