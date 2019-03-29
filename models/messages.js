const mongoose = require('mongoose');
const DB = require('../config/mongoose.config');

const messagesSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  text: String,
  at: Date
});

const Messages = DB.model('Messages', messagesSchema);

module.exports = Messages;
