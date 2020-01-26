const express = require('express');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');

const router = express.Router();

// Get active conversations
router.get('/active', (req, res) => {
    Conversation.find({ participants: req.user._id }) //req.user._id
        .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            console.log('conversations: ' + conversations);

            conversations.forEach((conversation) => {
                console.log('participants: ' + conversation.participants);
            });
            return res.status(200).json({ conversations });
        });
});

// Call to get one conversation and it's most recent message
router.get('/', (req, res) => {
    Conversation.find({ participants: req.user._id }) //req.user._id
        .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            // Empty array for conversation and it's most recent message
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
    Message.find({ conversationId: req.params.conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.name'
        })
        .exec((err, messages) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            return res.status(200).json({ conversation: messages });
        });
});

// New Conversation
router.post('/new/:recipientId', (req, res, next) => {
    if (!req.params.recipientId) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
        return next();
    }

    if (!req.body.composedMessage) {
        res.status(422).send({ error: 'Please enter a message.' });
        return next();
    }

    const conversation = new Conversation({

        participants: ['5e2bba66222c4f57b8e13b18', req.params.recipientId]//[req.user._id, req.params.recipient]
    });

    conversation.save((err, newConversation) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            author: '5e2bba66222c4f57b8e13b18'//req.user._id
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
        author: req.user._id//
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

