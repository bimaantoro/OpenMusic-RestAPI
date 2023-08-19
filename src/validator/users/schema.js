const Joi = require('joi');

const userPayloadSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = userPayloadSchema;
