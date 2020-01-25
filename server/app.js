const express =  require('express');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('Connected to the DB'))
    .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

