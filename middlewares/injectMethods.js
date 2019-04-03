const cookie = require('cookie');

const injectMethods = (req, res, next) => {
  res.json = function json(jsonData) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(jsonData));
  };

  res.cookie = function sendCookie(name, value, options) {
    const opts = { ...options };
    // const secret = this.req.secret;
    // const signed = opts.signed;

    // if (signed && !secret) {
    //   throw new Error('cookieParser("secret") required for signed cookies');
    // }

    const val =
      typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

    // if (signed) {
    //   val = `s:${sign(val, secret)}`;
    // }

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge);
      opts.maxAge /= 1000;
    }

    if (opts.path == null) {
      opts.path = '/';
    }

    res.setHeader('Set-Cookie', cookie.serialize(name, String(val), opts));
    return this;
  };

  res.clearCookie = function clearCookie(name, options) {
    const opts = { ...{ expires: new Date(1), path: '/' }, ...options };

    return this.cookie(name, '', opts);
  };

  next();
};

module.exports = injectMethods;
