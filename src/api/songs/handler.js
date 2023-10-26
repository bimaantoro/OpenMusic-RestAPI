class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    const songPayload = this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(songPayload);

    const res = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    res.code(201);
    return res;
  }

  async getSongsHandler(request) {
    const { title = '', performer = '' } = request.query;
    const songs = await this._service.getSongs(title, performer);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { songId } = request.params;
    const song = await this._service.getSongById(songId);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    const songPayload = this._validator.validateSongPayload(request.payload);
    const { songId } = request.params;

    await this._service.editSongById(songId, songPayload);

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { songId } = request.params;

    await this._service.deleteSongById(songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
