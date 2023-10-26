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
    const { albumId } = request.params;

    const album = await this._albumsService.getAlbumById(albumId);
    const songs = await this._albumsService.getSongsByAlbumId(albumId);

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
    const { albumId } = request.params;

    await this._albumsService.editAlbumById(albumId, albumPayload);
    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { albumId } = request.params;

    await this._albumsService.deleteAlbumById(albumId);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
