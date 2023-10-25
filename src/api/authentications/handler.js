class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  async postAuthHandler(request, h) {
    const { username, password } = this._validator.validatePostAuthPayload(request.payload);

    const userId = await this._usersService.verifyUserCredential(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ userId });
    const refreshToken = this._tokenManager.genereateRefreshToken({ userId });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const res = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    res.code(201);
    return res;
  }

  async putAuthHandler(request) {
    const { refreshToken } = this._validator.validatePutAuthPayload(request.payload);

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const userId = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ userId });
    return {
      status: 'success',
      message: 'Access token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthHandler(request) {
    const { refreshToken } = this._validator.validateDeleteAuthPayload(request.payload);

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler;
