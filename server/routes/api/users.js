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

// Save user current location
router.post('/location/:id', (req, res) => {

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const user_id = req.params.id;
    const location = { "type": "Point", "coordinates": [45.4951369, -73.5787776] }; //40.730610, -73.935242
    console.log("coordinateur : ",location.coordinates)
    console.log('location', location);

    User.findOne({ _id: user_id }).then(user => {
        if (user) {
            user.location = location;
            user.save()
                .then(user => {
                    return res.status(200).json({ message: 'Position has been setted' });
                })
                .catch(err => console.log(err));
        } else {
            res.send('User does not exist');
        }

    });
});

// Get a user's current position
router.get('/position/:id', (req, res) => {

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
            return res.send('User already exists');
        }
    });
});
 
// Get all users nearby by id
router.get('/nearby', (req, res) => {
    User.findById(req.headers.userid, function (err, user) {
        if(!user) {
            console.log('no user nearby');
            return res.send('No user');
        } else {
            console.log("user location : ",user);
            User.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [45.4951369,-73.5787776]
                        },
                        distanceField: "dist.calculated",
                        maxDistance: 5000, //30 000 meters
                        spherical: true
                    }
                }
            ], (err, data) => {
                if (err) {
                    console.log('error:', err);
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i]._id == req.headers.userid) {
                        delete data[i];
                    }
                }
                res.send(data);
            });
        }

    });
});


// Get user by ID
router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function (err, user) {
        console.log(user);
        res.send({ name: user.name, country: user.country, id: req.params.id });
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