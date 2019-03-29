const mongoose = require('mongoose');
const DB = require('../config/mongoose.config');

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    min: 3,
    unique: true
  },
  name: {
    type: String,
    min: 3,
    trim: true
  },
  email: {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  password: {
    type: String,
    min: 6
  },
  sessions: [String]
});

const Users = DB.model('Users', usersSchema);

module.exports = Users;
