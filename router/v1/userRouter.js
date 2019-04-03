const userRouter = require('router')();
const { clients, broadCastAdd, broadCastDel } = require('../../app');

userRouter.route('/').get((_req, res) => {
  res.stream.respond({ 'content-type': 'text/html', ':status': 200 });
  res.stream.end(JSON.stringify({ userList: Object.keys(clients) }));
});

userRouter.route('/register').get((req, res) => {
  req.socket.setTimeout(2147483647); // MAX Integer
  res.writeHead(200, {
    'Content-type': 'text/event-stream',
    'access-control-allow-origin': '*',
    'Cache-Control': 'no-cache'
  });

  clients[req.user.username] = res; // <- Add this client to the broadcast list
  broadCastAdd(req.user.username);

  (clientId => {
    req.on('close', () => {
      // <- Remove this client when he disconnects
      delete clients[clientId];
      broadCastDel(clientId);
    });
  })(req.user.username);
});
