class AlbumsHandler {
  constructor(albumsService, validator) {
    this._albumsService = albumsService;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {
    const albumPayload = this._validator.validateAlbumPayload(request.payload);
    const albumId = await this._albumsService.addAlbum(albumPayload);

    const res = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    res.code(201);
    return res;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this._albumsService.getAlbumById(id);
    const songs = await this._albumsService.getSongsByAlbumId(id);

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    };
  }

  async putAlbumByIdHandler(request) {
    const albumPayload = this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._albumsService.editAlbumById(id, albumPayload);
    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;

    await this._albumsService.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
