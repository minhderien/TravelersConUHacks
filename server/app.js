const express =  require('express');
const bodyParser =  require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const http = require('http');

// Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

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
const conversations = require('./routes/api/conversations');

app.use('/api/users', users);
app.use('/api/conversations', conversations);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(5100);

io.on('connection', function (socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    
    socket.on('sendMessage', (data) => {
        console.log(data.contents)
        io.emit('receiveMessage', data)
    });


    console.log('Connection established');
});

