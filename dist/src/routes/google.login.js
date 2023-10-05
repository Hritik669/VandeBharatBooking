"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRoutes = void 0;
const google_auth_1 = require("../google login/google.auth");
exports.GoogleRoutes = [
    {
        method: 'GET',
        path: '/',
        handler: google_auth_1.googleLogin,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
    {
        method: 'GET',
        path: '/auth/google/callback',
        handler: google_auth_1.googleCallback,
        options: {
            auth: false,
            tags: ['api', 'google'],
        },
    },
];
//# sourceMappingURL=google.login.js.map