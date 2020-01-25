const mongoose = require('mongoose');

// Schema defines how chat messages will be stored in MongoDB
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    {
        timestamps: true
      
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

