require('dotenv').config();
const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');
const SongsService = require('./services/SongsService');
const songs = require('./api/songs');
const songsValidator = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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

      console.log(response);
      const newRes = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.',
      });
      newRes.code(500);
      return newRes;
    }

    return h.continue;
  });

  await server.register([{
    plugin: songs,
    options: {
      service: songsService,
      validator: songsValidator,
    },
  }]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
