import { ServerRoute } from '@hapi/hapi';
import { StopOperation } from '../controllers/stop.controller';

const StopRoutes: ServerRoute[]=[
    {
        method:'POST',
        path:'/addStop',
        handler:async (req,h) => {
            const detail= req.payload as any;
            const stopResponse = await StopOperation.addStop(detail);
            return stopResponse;
        },
        options:{
            auth:false,
        }
    }
]

export default StopRoutes;