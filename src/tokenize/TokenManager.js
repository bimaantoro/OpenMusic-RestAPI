const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');
const config = require('../commons/config');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, config.jwtToken.accessToken.key),
  genereateRefreshToken: (payload) => Jwt.token.generate(payload, config.jwtToken.refreshToken.key),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, config.jwtToken.refreshToken.key);

      const { payload } = artifacts.decoded;
      return payload;
    } catch (err) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
