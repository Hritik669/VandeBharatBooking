"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.googleLogin = void 0;
const google_auth_library_1 = require("google-auth-library");
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_controller_1 = require("../controllers/session.controller");
const redis_middleware_1 = require("../redis/redis.middleware");
const session_model_1 = require("../models/session.model");
const oauthClient = new google_auth_library_1.OAuth2Client({
    clientId: '671214805761-lehcp6bci1ql8fba64orik2m9bkh3dkk.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: 'http://localhost:3000/auth/google/callback'
});
function googleLogin(Request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginUrl = yield getGoogleSignInUrl();
            return `
            <html>
              <head>
                <title>Google Sign-In Example</title>
              </head>
              <body>
                <h1>Google Sign-In Example</h1>
                <a href="${loginUrl}">Login with Google</a>
              </body>
            </html>
        `;
        }
        catch (error) {
            console.error("Error in googleLogin:", error);
            return "An error occurred during Google login.";
        }
    });
}
exports.googleLogin = googleLogin;
function googleCallback(Request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const code = Request.query.code;
            const { tokens } = yield oauthClient.getToken(code);
            console.log("Tokens:", tokens);
            const ticket = yield oauthClient.verifyIdToken({
                idToken: tokens.id_token,
                audience: '671214805761-lehcp6bci1ql8fba64orik2m9bkh3dkk.apps.googleusercontent.com'
            });
            console.log("Ticket:", ticket);
            const { name, email } = ticket.getPayload();
            console.log("User Info:", name, email);
            oauthClient.revokeToken(tokens.access_token);
            const createUser = yield google_signup(email, name);
            return createUser;
        }
        catch (error) {
            console.error("Error in googleCallback:", error);
            return "An error occurred during Google callback.";
        }
    });
}
exports.googleCallback = googleCallback;
function getGoogleSignInUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        const authUrl = oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email']
        });
        return authUrl;
    });
}
function google_signup(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.UserModel.findOne({ email });
            if (!user) {
                const newUser = new models_1.UserModel({
                    username: name,
                    email: email,
                    role: 'user',
                });
                yield newUser.save();
            }
            const token = jsonwebtoken_1.default.sign({ email, role: 'user' }, process.env.SECRET_KEY, { expiresIn: '10h', });
            const userSession = yield session_model_1.SessionModel.findOne({ user_id: user._id });
            yield session_controller_1.Sessions.sessionEntry('web', user, userSession);
            yield (0, redis_middleware_1.maintainSession)(user, 'web');
            return { message: "Google sign-up successful", token };
        }
        catch (error) {
            console.error("Error in google_signup:", error);
            return "An error occurred during Google sign-up.";
        }
    });
}
//# sourceMappingURL=google.auth.js.map