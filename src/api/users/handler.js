class UsersHandler {
  constructor(usersService, validator) {
    this._usersService = usersService;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    const userPayload = this._validator.validateUserPayload(request.payload);

    const userId = await this._usersService.addUser(userPayload);
    console.log(userId);

    const res = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    res.code(201);
    return res;
  }
}

module.exports = UsersHandler;
