const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get users (users nearby)
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

// Get user by ID

// Add user (register)

// Delete user

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect
    //username:password
    ('mongodb+srv://noname:conuhacks@travelersdb-jxfb7.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('TravelersDB').collection('users');
}


module.exports = router;