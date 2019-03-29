const authRouter = require('router')();
const JWT = require('jsonwebtoken');

const Users = require('../models/users');
const { COOKIE_SECRET } = process.env;

const getToken = async payload => {
  const token = JWT.sign(payload, COOKIE_SECRET);
  await Users.findOneAndUpdate(
    { username: payload.username },
    { $push: { session: token } },
    { new: true }
  );
  return token;
};

authRouter.route('/signup').post(async (req, res) => {
  try {
    const { body } = req;
    body.email = {
      id: body.email
    };

    const exists = await Users.findOne({
      'email.id': body.email.id,
      username: body.username
    });
    if (!exists) {
      // creating user
      const user = new Users(body);

      // token generation
      payload = {
        email: body.email,
        name: body.name,
        username: body.username
      };
      const token = await getToken(payload);

      // setting cookie
      res.cookie('token', token);

      // adding one session
      user.sessions = [token];

      // saving user
      await user.save();
      res.json({
        status: 'Success'
      });
    } else {
      throw Error('User already Exists');
    }
  } catch (error) {
    console.log({ error: error.message });
    res.statusCode = 403;
    res.json({ status: 'failed' });
  }
});

authRouter.route('/login').post(async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const isEmail =
      usernameOrEmail.indexOf('@') !== -1 &&
      usernameOrEmail.indexOf('@') < usernameOrEmail.indexOf('.');

    let user;
    if (isEmail) {
      user = await Users.findOne({
        'email.id': usernameOrEmail,
        password
      }).lean();
    } else {
      user = await Users.findOne({
        username: usernameOrEmail,
        password
      }).lean();
    }
    if (user) {
      const token = await getToken(user);

      res.cookie('token', token);
      res.statusCode = 200;
      res.end();
    } else {
      res.statusCode = 401;
      res.end();
    }
  } catch (error) {
    console.log({ error });
    res.statusCode = 403;
    res.json({ error });
  }
});

authRouter.route('/logout').get((req, res) => {
  res.cookie('name', 'name');
  res.end();
});

module.exports = authRouter;
