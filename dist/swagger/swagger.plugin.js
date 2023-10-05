"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const authAdmin_1 = __importDefault(require("../src/middleware/authAdmin"));
const Inert = __importStar(require("@hapi/inert"));
const Vision = __importStar(require("@hapi/vision"));
const HapiSwagger = __importStar(require("hapi-swagger"));
exports.plugins = [
    {
        plugin: authAdmin_1.default,
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
            grouping: 'tags',
            tags: [
                { name: 'user', description: 'user onboarding' },
                { name: 'trainroute', description: 'train route operation' },
                { name: 'train', description: 'train operation' },
                { name: 'stop', description: 'stop operation' },
                { name: 'seat', description: 'seat operation' },
                { name: 'coach', description: 'coach operation' },
                { name: 'booking', description: 'booking operation' },
                { name: 'booking', description: 'booking operation' },
                { name: 'chatbot', description: 'Chatbot' },
                { name: 'google', description: 'goole-login' }
            ],
            documentationPath: '/documentation',
        },
    },
];
//# sourceMappingURL=swagger.plugin.js.map