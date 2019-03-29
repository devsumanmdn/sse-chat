const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  res.statusCode = 403;
  res.json({
    error: 'Not Authenticated'
  });
};

module.exports = ensureAuthenticated;
