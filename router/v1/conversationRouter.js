const conversationRouter = require('router')();

const { broadCast } = require('../../app'); // <- map of registered users

conversationRouter.route('/message').post((req, res) => {
  if (!req.isAuthenticated) {
    // eslint-disable-next-line no-console
    console.log('user unknown');
    res.stream.respond({ 'content-type': 'text/html', ':status': 401 });
    res.stream.end();
    return;
  }

  let jsonString = '';
  req.on('data', data => {
    jsonString += data;
  });
  req.on('end', () => {
    const json = JSON.parse(jsonString);
    broadCast(req.user.username, json.msg);
  });
  res.stream.respond({ 'content-type': 'text/html', ':status': 204 });
  res.stream.end();
});

conversationRouter('/');
