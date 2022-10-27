require('dotenv').config();
const jwt = require('jsonwebtoken');
const { secretTokenKey } = require('../utils/config');

const UnAuthorizedErr = require('../errors/UnAuthorizedErr');
const { NEED_AUTH_ERR_MSG } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedErr(NEED_AUTH_ERR_MSG));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretTokenKey);
  } catch (err) {
    next(new UnAuthorizedErr(NEED_AUTH_ERR_MSG));
    return;
  }
  req.user = payload;
  next();
};
