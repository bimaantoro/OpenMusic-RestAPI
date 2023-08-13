class SongsHandler {
  constructor(service) {
    this._service = service;
  }

  postSongHandler(req) {
    const {
      title, year, performer, genre, duration, albumId,
    } = req.payload;

    this._service.addSong({
      title, year, performer, genre, duration, albumId,
    });
  }

  getSongsHandler() {}

  getSongByIdHandler() {}

  putSongByIdHandler() {}

  deleteSongByIdHandler() {}
}
