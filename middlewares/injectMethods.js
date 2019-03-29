const cookie = require('cookie');

const injectMethods = (req, res, next) => {
  res.json = json => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json));
  };

  res.cookie = (name, value, options) => {
    const prevCookies = res.getHeader('Set-Cookie');
    const setCookies = [
      ...(prevCookies ? [...prevCookies] : []),
      cookie.serialize(name, value, { path: '/', options })
    ];
    res.setHeader('Set-Cookie', setCookies);
  };
  next();
};

module.exports = injectMethods;
