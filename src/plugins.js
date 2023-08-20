// albums
const albums = require('./api/albums');
const AlbumsService = require('./services/AlbumsService');
const albumsValidator = require('./validator/albums');

// songs
const songs = require('./api/songs');
const SongsService = require('./services/SongsService');
const songsValidator = require('./validator/songs');

// users
const users = require('./api/users');
const UsersService = require('./services/UsersService');
const usersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const authenticationsValidator = require('./validator/authentications');

const songsService = new SongsService();
const albumsService = new AlbumsService();
const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();

const plugins = [
  {
    plugin: songs,
    options: {
      service: songsService,
      validator: songsValidator,
    },
  },
  {
    plugin: albums,
    options: {
      albumsService,
      songsService,
      validator: albumsValidator,
    },
  },
  {
    plugin: users,
    options: {
      service: usersService,
      validator: usersValidator,
    },
  },
  {
    plugin: authentications,
    options: {
      authenticationsService,
      usersService,
      tokenManager: TokenManager,
      validator: authenticationsValidator,
    },
  },
];

module.exports = plugins;
