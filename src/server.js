require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/ClientError');
const plugins = require('./commons/plugins');
const config = require('./commons/config');

const init = async () => {
  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    debug: {
      request: ['error'],
    },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newRes = h.response({
          status: 'fail',
          message: response.message,
        });
        newRes.code(response.statusCode);
        return newRes;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newRes = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.',
      });
      newRes.code(500);
      return newRes;
    }

    return h.continue;
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: config.jwtToken.accessToken.key,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwtToken.accessToken.expiresIn,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  });

  await server.register(plugins);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
