const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User')
const passport = require('passport');

const router = express.Router();

// User login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/'
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send('logged out');
});

// Add user (register)
router.post('/register', (req, res) => {
    const {name, email, password, country} = req.body;
    // No validation
    console.log(name, email, password, country);


    User.findOne({email: email}).then(user => {
        if (!user) {
            const newUser = new User({
                name,
                email,
                password,
                country
            });

                // Hash password
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    newUser.save()
                        .then(user => {
                            res.status(200);
                        })
                        .catch(err => console.log(err));
            }));
        } else {
            res.send('User already exists');
        }
    });


});

// Get users (users nearby)
router.get('/', async (req, res) => {
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      });
});

// Get user by ID
router.get('/:id', async (req, res) => {

    User.findById(req.query.id, function (err, user) {
        res.send(user);  
    });
});



module.exports = router;