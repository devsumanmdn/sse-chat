const v1Router = require('router')();

const conversationRouter = require('./conversationRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

v1Router.use('/auth', authRouter);
v1Router.use('/conversations', conversationRouter);
v1Router.use('/users', userRouter);

module.exports = v1Router;
