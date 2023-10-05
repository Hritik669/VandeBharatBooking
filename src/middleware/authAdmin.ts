const Jwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
import { log } from "console";
import { SessionModel } from "../models/session.model";

const plugin = {
  name: 'jwt-authentication',
  version: '1.0.0',
  register: async function (server, options) {
    await server.register(Jwt);

    server.auth.strategy('admin', 'jwt', {
      key: secretKey,
      validate: async (decoded, request, h) => {        
        const sessionStatus = await SessionModel.findOne({ userId: decoded.userId });
        // console.log(sessionStatus);
        if (!sessionStatus || sessionStatus.status==false) {
          return { isValid: false };
        }

        if (decoded.role == "admin") {
          return { isValid: true };
        }
        else {
          return { isValid: false };
        }
      },
      verifyOptions: { algorithms: ['HS256'] },
    });


    server.auth.strategy('user', 'jwt', {
      key: secretKey,
      validate: async (decoded) => {
        const sessionStatus = await SessionModel.findOne({ userId: decoded.userId });
        // console.log(sessionStatus);
        if (!sessionStatus || sessionStatus.status==false) {
          return { isValid: false };
        }

        if (decoded.role == "user") {
          return { isValid: true };
        }
        else {
          return { isValid: false };
        }
      },
      verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default('admin', 'user');
    // server.auth.default('user');

  },
};

export default plugin;
// module.exports = plugin;
