const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');
const passport = require('passport');

const router = express.Router();

// User login
router.post('/login',
    passport.authenticate('local'), function (req, res) {
        res.redirect('/api/users/' + req.user.id);
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.send('logged out');
});

// Add user (register)
router.post('/register', (req, res) => {
    const { name, email, password, country } = req.body;
    // No validation
    console.log(name, email, password, country);


    User.findOne({ email: email }).then(user => {
        if (!user) {
            const newUser = new User({
                name,
                email,
                password,
                country
            });
            bcrypt.hash(newUser.password, null, null, function (err, hash) {
                // Store hash in your password DB.
                newUser.password = hash;

                newUser.save()
                    .then(user => {
                        res.status(200);
                    })
                    .catch(err => console.log(err));
            });

        } else {
            res.send('User already exists');
        }
    });


});

// Get users (users nearby)
router.get('/', async (req, res) => {
    User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

// Get user by ID
router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, user) {
        console.log(user);
        res.send({ name: user.name, country: user.country , id: user._id});
    });
});

// Get list of users of active conversations
router.get('/active/conversations', async (req, res) => {
    Conversation.find({ participants: req.headers.userid }) //'5e2bba66222c4f57b8e13b18'
        .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return err;
            }
            console.log('conversations: ' + conversations);

            let participantsIds = [];
            conversations.forEach((conversation) => {
                conversation.participants.forEach((participantId) => {
                    // If it's not himself
                    if (req.headers.userid != participantId) {
                        participantsIds.push(participantId);
                    }
                });
            });

            var query = User.find({ _id: { $in: participantsIds } });
            query.exec(function (err, users) {
                return res.status(200).send(users);
            });
        });
});



module.exports = router;