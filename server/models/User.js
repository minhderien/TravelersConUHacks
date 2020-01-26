const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    date: {
        type: Date,
        default: Date.Now
    }
});


//UserSchema.createIndex( { "location" : "2dsphere" } );
UserSchema.index({location: '2dsphere'});


const User = mongoose.model('User', UserSchema);
module.exports = User;