const Router = require('router');
const bodyParser = require('body-parser');
const authRouter = require('./authRouter');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const apiRouter = new Router();

apiRouter.use(bodyParser.json());

apiRouter.use('/auth', authRouter);

apiRouter.use(ensureAuthenticated);
apiRouter.get('/', (req, res) => {
  console.log(req.user);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('hi');
});

module.exports = apiRouter;
