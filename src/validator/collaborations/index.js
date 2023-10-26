const InvariantError = require('../../exceptions/InvariantError');
const collaborationPayloadSchema = require('./schema');

const collaborationsValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = collaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult.value;
  },
};

module.exports = collaborationsValidator;
