const next = require('next');
const Router = require('router');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './site' });
const handle = app.getRequestHandler();

const siteRouter = new Router();

app.prepare().then(() => {
  siteRouter.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
});

module.exports = siteRouter;
