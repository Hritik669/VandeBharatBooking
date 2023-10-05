import { Server } from '@hapi/hapi';
import { connectToDatabase } from './core/connection';
import * as dotenv from 'dotenv';
import { routes } from './routes/index.route';
import { plugins } from '../swagger/swagger.plugin';
import { logError } from 'logging-colorify';
dotenv.config();

class Init {
    static async hapiserver() {
        logError("this is the mai file error------->>>>>>>>>>>>>")
        const server = new Server({
            port: process.env.PORT,
            host: process.env.HOST,
        });
        await connectToDatabase();
        await server.register(plugins);
        server.route(routes);
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    }
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

Init.hapiserver();
