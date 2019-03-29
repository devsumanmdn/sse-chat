const mongoose = require('mongoose');
const DB = require('../config/mongoose.config');

const conversationsSchema = mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
});

const Conversations = DB.model('Conversations', conversationsSchema);

module.exports = Conversations;
