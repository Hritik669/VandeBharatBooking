import { Request, ResponseToolkit } from "@hapi/hapi";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../models";
import jwt from 'jsonwebtoken';
import { Sessions } from "../controllers/session.controller";
import { maintainSession } from "../redis/redis.middleware";
import { SessionModel } from "../models/session.model";


const oauthClient = new OAuth2Client({
    clientId: '671214805761-lehcp6bci1ql8fba64orik2m9bkh3dkk.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: 'http://localhost:3000/auth/google/callback'
});



export async function googleLogin(Request: Request, h: ResponseToolkit) {
    try {
        const loginUrl = await getGoogleSignInUrl();
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
    } catch (error) {
        console.error("Error in googleLogin:", error);
        return "An error occurred during Google login.";
    }
}

export async function googleCallback(Request: Request, h: ResponseToolkit) {
    try {
        const code = Request.query.code;
        const { tokens } = await oauthClient.getToken(code as string);
        console.log("Tokens:", tokens);

        const ticket: any = await oauthClient.verifyIdToken({
            idToken: tokens.id_token as string,
            audience: '671214805761-lehcp6bci1ql8fba64orik2m9bkh3dkk.apps.googleusercontent.com'
        });

        console.log("Ticket:", ticket);

        const { name, email } = ticket.getPayload();
        console.log("User Info:", name, email);

        oauthClient.revokeToken(tokens.access_token as string);

        const createUser = await google_signup(email, name);
        return createUser;
    } catch (error) {
        console.error("Error in googleCallback:", error);
        return "An error occurred during Google callback.";
    }
}

async function getGoogleSignInUrl() {

    const authUrl = oauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email']
    });
    return authUrl;
}


async function google_signup(email: string, name: string) {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {

            const newUser = new UserModel({
                username: name,
                email: email,
                role: 'user',
            });

            await newUser.save();
        }

        const token = jwt.sign({ email, role: 'user' }, process.env.SECRET_KEY,{ expiresIn: '10h',});
        const userSession = await SessionModel.findOne({ user_id: user._id });
        await Sessions.sessionEntry('web', user, userSession);
        await maintainSession(user, 'web');

        return { message: "Google sign-up successful", token };
    } catch (error) {
        console.error("Error in google_signup:", error);
        return "An error occurred during Google sign-up.";
    }
}
