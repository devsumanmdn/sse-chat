require('dotenv').config();
const h2 = require('http2');
const Router = require('router');
const finalhandler = require('finalhandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const options = require('./config/https.config');
const authenticationInit = require('./middlewares/authenticationInit');
const injectMethods = require('./middlewares/injectMethods');

const port = parseInt(process.env.PORT, 10) || 3000;

const router = new Router();

const clients = {};

const broadCast = (user, msg) => {
  // eslint-disable-next-line no-console
  console.log('broadCast', user, msg);
  Object.entries(clients).forEach(([clientId, res]) =>
    res.write(
      `event: info\ndata: {"sender":"${user}","msg": "${msg}"}\n\n`,
      'utf8'
    )
  );
};

const broadCastAdd = user => {
  // eslint-disable-next-line no-console
  console.log('add', user);
  Object.entries(clients).forEach(([clientId, res]) =>
    res.write(`event: oper\ndata: {"oper":"add","user":"${user}"}\n\n`, 'utf8')
  );
};

const broadCastDel = user => {
  // eslint-disable-next-line no-console
  console.log('del', user);
  Object.entries(clients).forEach(([clientId, res]) =>
    res.write(`event: oper\ndata: {"oper":"del", "user":"${user}"}\n\n`, 'utf8')
  );
};

const apiRouter = require('./router/apiRouter');
const siteRouter = require('./site/siteRouter');

router.use(injectMethods);
router.use(cookieParser());
router.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
router.use(authenticationInit);
router.use('/api', apiRouter);
router.use(siteRouter);

(async () => {
  const h2Options = {
    ...(await options()),
    allowHTTP1: true
  };
  // eslint-disable-next-line no-unused-vars
  const h2Server = h2
    .createSecureServer(h2Options, (req, res) => {
      router(req, res, finalhandler(req, res));
    })
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
})();

module.exports = {
  clients,
  broadCast,
  broadCastAdd,
  broadCastDel
};
