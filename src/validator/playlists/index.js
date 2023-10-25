const InvariantError = require('../../exceptions/InvariantError');
const { postPlaylistPayloadSchema, postSongToPlaylistPayloadSchema } = require('./schema');

const playlistsValidator = {
  validatePostPlaylistPayload: (payload) => {
    const validationResult = postPlaylistPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
  validatePostSongToPlaylistPayload: (payload) => {
    const validationResult = postSongToPlaylistPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
};

module.exports = playlistsValidator;
