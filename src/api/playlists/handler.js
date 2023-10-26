class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    const { name } = this._validator.validatePostPlaylistPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

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

    const playlists = await this._playlistsService.getPlaylists(owner);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { playlistId } = request.params;
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._playlistsService.deletePlaylistById(playlistId);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postSongToPlaylistHandler(request, h) {
    const { playlistId } = request.params;
    const { songId } = await this._validator.validatePostSongToPlaylistPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, owner);

    await this._songsService.getSongById(songId);

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

    await this._playlistsService.verifyPlaylistAccess(playlistId, owner);

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

    await this._playlistsService.verifyPlaylistAccess(playlistId, owner);
    await this._playlistsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
