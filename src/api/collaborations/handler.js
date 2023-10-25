class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    const { playlistId, userId } = this._validator.validateCollaborationPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

    const res = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    res.code(201);
    return res;
  }

  async deleteCollaborationHandler(request) {
    const { playlistId, userId } = this._validator.validateCollaborationPayload(request.payload);
    const { userId: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._collaborationsService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi gagal dihapus',
    };
  }
}

module.exports = CollaborationsHandler;
