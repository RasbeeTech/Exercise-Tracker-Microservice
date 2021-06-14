require('dotenv').config();
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// DB Schemas.
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {type: String, required: true},
});

const exerciseSchema = new Schema({
    description: {type: String},
    duration: {type: String},
    date: {type: Date}
});

// Listen to port.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Middleware.
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({optionsSuccessStatus: 200}));

// Create DB models.
let User = mongoose.model("user", userSchema);
let Exercise = mongoose.model("excercise", exerciseSchema);

// Routes.
app.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});