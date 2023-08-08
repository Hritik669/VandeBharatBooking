const Jwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const plugin = {
  name: 'jwt-authentication',
  version: '1.0.0',
  register: async function (server, options) {
    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
      key: secretKey,
      validate: async (decoded, request, h) => {
        if (decoded.role == "admin") {
          return { isValid: true };
        }
        else {
          return { isValid: false };
        }
      },
      verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default('jwt');
  },
};

export default plugin;
// module.exports = plugin;
