const InvariantError = require('../../exceptions/InvariantError');
const albumPayloadSchema = require('./schema');

const albumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = albumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
};

module.exports = albumsValidator;
