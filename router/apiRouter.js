const apiRouter = require('router')();
const bodyParser = require('body-parser');
const v1Router = require('./v1');

apiRouter.use(bodyParser.json());

apiRouter.use('/v1', v1Router);

module.exports = apiRouter;
