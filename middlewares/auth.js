require('dotenv').config();
const jwt = require('jsonwebtoken');

const UnAuthorizedErr = require('../errors/UnAuthorizedErr');

const { JWT_SECRET, NODE_ENV } = process.env;

const {
  NeedAuthorizeErrMessage,
} = require('../constants/errorstatuses');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedErr(NeedAuthorizeErrMessage));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnAuthorizedErr(NeedAuthorizeErrMessage));
    return;
  }
  req.user = payload;
  next();
};
