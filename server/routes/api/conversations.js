const express = require('express');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');

const router = express.Router();

// Get all conversations of a user
router.get('/', (req, res) => {
    Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec((err, conversations) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      const fullConversations = [];
      conversations.forEach((conversation) => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'profile.name'
          })
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
});

// Get a conversation
router.get('/:conversationId', (req, res) => {
    Message.find({ conversationId: req.params.conversationId})
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.name'
        })
        .exec((err, messages) => {
            if (err) {
                res.send({error: err});
                return next(err);
            }

            return res.status(200).json({conversation: messages});
        });
});

// New Conversation
router.post('/new/:recipientId', (req, res, next) => {
    console.log('recipient:' + req.params.recipientId);
    if (!req.params.recipientId) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
        return next();
      }
    
      if (!req.body.composedMessage) {
        res.status(422).send({ error: 'Please enter a message.' });
        return next();
      }
    
      const conversation = new Conversation({
        // ['5e2bba66222c4f57b8e13b18', '5e2c770532edc50a94327c93']//
        participants: [req.user._id, req.params.recipient]
      });
    
      conversation.save((err, newConversation) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
    
        const message = new Message({
          conversationId: newConversation._id,
          body: req.body.composedMessage,
          author: req.user._id
        });
    
        message.save((err, newMessage) => {
          if (err) {
            res.send({ error: err });
            return next(err);
          }
    
          return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        });
      });
});



// Reply to conversation
router.post('/:conversationId', (req, res, next) => {
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
      });
    
      reply.save((err, sentReply) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
    
        return res.status(200).json({ message: 'Reply successfully sent!' });
      });
});

module.exports = router;

