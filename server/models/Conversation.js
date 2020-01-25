  
const mongoose = require('mongoose');

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;

