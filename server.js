require('dotenv').config();
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

let { newUser } = require("./app.js");
let { getUser } = require("./app.js");
let { newExercise } = require("./app.js");
let { getExercises } = require("./app.js");

// Listen to port.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Middleware.
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({optionsSuccessStatus: 200}));

// Routes.
app.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.post('/api/users', newUser);
app.get('/api/users', getUser);
app.post('/api/users/:_id/exercises', newExercise);
app.get('/api/users/:_id/logs', getExercises);
