import hapi, { Server } from '@hapi/hapi';
import { connectToDatabase } from './core/connection';
import * as dotenv from 'dotenv';
import {routes} from './routes/index.route';
import { Response } from './core/response';
import plugin from './middleware/authUser';

dotenv.config();
class Init {
    static async hapiserver() {
        const server = new Server({
            port: process.env.PORT,
            host: process.env.HOST,
        });
        
        await connectToDatabase();
        await server.register(plugin);
        
        server.route(routes);
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
};

process.on('unhandledRejection', (err) => { 

    console.log(err);
    process.exit(1);
});

Init.hapiserver();