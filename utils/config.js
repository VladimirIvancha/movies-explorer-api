const mongodbServer = 'mongodb://localhost:27017/moviesdb';
const secretTokenKey = 'secret-key';
const port = 3001;

const jwtSettings = {
  expiresIn: '7d',
};

module.exports = {
  secretTokenKey,
  mongodbServer,
  port,
  jwtSettings,
};
