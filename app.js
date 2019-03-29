require('dotenv').config();
const h2 = require('http2');
const Router = require('router');
const finalhandler = require('finalhandler');
const cookieParser = require('cookie-parser');

const options = require('./config/https.config');
const authenticationInit = require('./middlewares/authenticationInit');
const injectMethods = require('./middlewares/injectMethods');
const morgan = require('morgan');

const port = parseInt(process.env.PORT, 10) || 3000;

const router = new Router();

const apiRouter = require('./router/apiRouter');
const siteRouter = require('./router/siteRouter');

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
  const h2Server = h2
    .createSecureServer(h2Options, (req, res) => {
      router(req, res, finalhandler(req, res));
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
})();
