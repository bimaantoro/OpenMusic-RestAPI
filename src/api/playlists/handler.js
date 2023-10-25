const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsHandler {
  constructor(playlistsService, validator) {
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    const { name } = this._validator.validatePostPlaylistPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(owner);
    const playlistId = await this._playlistsService.addPlaylist({ name, owner });

    const res = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    res.code(201);
    return res;
  }

  async getPlaylistsHandler(request) {
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(owner);
    const playlists = await this._service.getPlaylists(owner);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, owner);
    await this._playlistsService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postSongToPlaylistHandler(request, h) {
    const { playlistId } = request.params;
    const { songId } = await this._validator.validatePostSongToPlaylistPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);

    const isSongExist = await this._playlistsService.isSongExists(songId);

    if (!isSongExist) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    await this._playlistsService.addSongToPlaylist(playlistId, songId);

    const res = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    res.code(201);
    return res;
  }

  async getSongInPlaylistHandler(request) {
    const { playlistId } = request.params;
    const { userId: owner } = request.auth.credentials;

    const isPlaylistExist = await this._playlistsService.isPlaylistExists(playlistId);

    if (!isPlaylistExist) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);

    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const songs = await this._playlistsService.getSongsByPlaylistId(playlistId);

    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    const { playlistId } = request.params;
    const { songId } = this._validator.validatePostSongToPlaylistPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._playlistsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
