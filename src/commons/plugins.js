// albums
const albums = require('../api/albums');
const AlbumsService = require('../services/AlbumsService');
const albumsValidator = require('../validator/albums');

// songs
const songs = require('../api/songs');
const SongsService = require('../services/SongsService');
const songsValidator = require('../validator/songs');

// users
const users = require('../api/users');
const UsersService = require('../services/UsersService');
const usersValidator = require('../validator/users');

// authentications
const authentications = require('../api/authentications');
const AuthenticationsService = require('../services/AuthenticationsService');
const TokenManager = require('../tokenize/TokenManager');
const authenticationsValidator = require('../validator/authentications');

// playlists
const playlists = require('../api/playlists');
const PlaylistsService = require('../services/PlaylistsService');
const playlistsValidator = require('../validator/playlists');

// collaborations
const CollaborationsService = require('../services/CollaborationsService');
const collaborations = require('../api/collaborations');
const collaborationsValidator = require('../validator/collaborations');

const songsService = new SongsService();
const albumsService = new AlbumsService();
const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const collaborationsService = new CollaborationsService();
const playlistsService = new PlaylistsService(collaborationsService);

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
      service: albumsService,
      validator: albumsValidator,
    },
  },
  {
    plugin: users,
    options: {
      usersService,
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
  {
    plugin: playlists,
    options: {
      service: playlistsService,
      validator: playlistsValidator,
    },
  },
  {
    plugin: collaborations,
    options: {
      collaborationsService,
      playlistsService,
      validator: collaborationsValidator,
    },
  },
];

module.exports = plugins;
