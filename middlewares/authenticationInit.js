const JWT = require('jsonwebtoken');
const { COOKIE_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const payload = JWT.verify(token, COOKIE_SECRET);
    console.log({ payload });
    req.user = user;
    req.isAuthenticated = true;
  } catch (error) {
    req.isAuthenticated = false;
    req.user = {};
  }
  next();
};
