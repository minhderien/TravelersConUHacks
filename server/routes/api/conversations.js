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

            return res.status(200).json({ messages: messages });
        });
});

router.get('/:participantId1/:participantId2', (req, res) => {
    const id1 = req.params.participantId1;
    const id2 = req.params.participantId2;
    let participantsIds = [ id1, id2];
    //console.log('participants', participantsIds);
    Conversation.find({
        'participants': { $eq: participantsIds }
    }, function(err, conversation) {
        console.log("conversation " + conversation);
        res.status(200).json(conversation);
    });
});

// New Conversation
router.post('/new/:fromId/:recipientId', (req, res, next) => {
    const fromId = req.params.fromId;
    const recipientId = req.params.recipientId;
    if (!req.params.recipientId) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
        return next();
    }

    // if (!req.body.composedMessage) {
    //     res.status(422).send({ error: 'Please enter a message.' });
    //     return next();
    // }

    const conversation = new Conversation({

        participants: [fromId, recipientId]//[req.user._id, req.params.recipient]
    });

    conversation.save((err, newConversation) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        // const message = new Message({
        //     conversationId: newConversation._id,
        //     body: req.body.composedMessage,
        //     author: fromId//req.user._id
        // });

        // message.save((err, newMessage) => {
        //     if (err) {
        //         res.send({ error: err });
        //         return next(err);
        //     }

        //     return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        // });
    });
});

// Reply to conversation
router.post('/:conversationId', (req, res, next) => {
    console.log("test : ",req)
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.body.idAuthor//
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

