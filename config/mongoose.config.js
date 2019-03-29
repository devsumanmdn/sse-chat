const { Mongoose } = require('mongoose');
const databaseUri = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  // Make Mongoose use `findOneAndUpdate()`. Default value `true`
  useFindAndModify: false
};
const DB = new Mongoose();
DB.connect(
  databaseUri,
  options
);

// Exporting the connection so we can use on the models;
module.exports = DB;
