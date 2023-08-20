const InvariantError = require('../../exceptions/InvariantError');
const { postAuthPayloadSchema, putAuthPayloadSchema, deleteAuthPayloadSchema } = require('./schema');

const authenticationsValidator = {
  validatePostAuthPayload: (payload) => {
    const validationResult = postAuthPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthPayload: (payload) => {
    const validationResult = putAuthPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthPayload: (payload) => {
    const validationResult = deleteAuthPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = authenticationsValidator;
