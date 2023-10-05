import plugin from "../src/middleware/authAdmin";
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';

export const plugins = [
    {
        plugin,
    },
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Vande Bharat Booking',
                version: '1.0.0',
            },
            securityDefinitions: {
                jwt: {
                  type: 'apiKey',
                  name: 'Authorization',
                  in: 'header'
                }
            },
            security: [{ jwt: [] }],
            grouping:'tags',
            tags: [
                { name: 'user', description: 'user onboarding' },
                { name: 'trainroute', description: 'train route operation' },
                { name: 'train', description:'train operation'},
                { name: 'stop', description:'stop operation'},
                { name: 'seat', description:'seat operation'},
                { name: 'coach', description:'coach operation'},
                { name: 'booking', description:'booking operation'},
                { name: 'booking', description:'booking operation'},
                { name: 'chatbot', description:'Chatbot'},
                { name: 'google', description:'goole-login'}

            ],
            documentationPath: '/documentation', 
        },
    },
];