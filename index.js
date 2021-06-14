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

const exerciseSchema = new Schema({
    description: {type: String},
    duration: {type: String},
    date: {type: Date, default: Date.now}
});

const userSchema = new Schema({
    user_name: {type: String, required: true},
});

// Create DB models.
let User = mongoose.model("user", userSchema);
let Exercise = mongoose.model("excercise", exerciseSchema);

// DB methods.
const createUser = (userName, done) => {
    User.findOne({user_name: userName}, (err, userFound) => {
        if(err) return console.error(err);
        if(!userFound){
            let newUser = new User({
                user_name: userName
            });
            newUser.save((err) => {
                if(err) return console.error(err);
                done(null, newUser);
            });
        } else {
            done(null, 'Username already taken.')
        }
    });
};

const findUsers = (done) => {
    User.find({}, (err, usersFound) => {
        if(err) return console.error(err);
        if(usersFound){
            done(null, usersFound);
        } else {
            done(null, 'Be the first to register!');
        }
    });
};

const createExercise = (exercise, done) => {
    User.findOne({_id: exercise._id}, (err, userFound) => {
        if(err) return console.error(err);
        if(userFound){
            let newExercise = new Exercise({
                _id: exercise._id,
                date: exercise.date,
                duration: exercise.duration,
                description: exercise.description
            });
            newExercise.save((err) => {
                if(err) return console.error(err);
                done(null, newExercise, userFound);
            })
        } else {
            done(null, "User does not exist.")
        }
    });
};

const findExercises = (userId, done) => {
    User.findOne({_id: userId}, (err, userFound)=> {
        if(err) console.error(err);
        if(userFound){
            Exercise.find({_id: userId}, (err, exercisesFound) => {
                if(err) return console.error(err);
                if(exercisesFound){
                    let formattedExercises = exercisesFound.map((exercise) => {
                        return {
                            description: exercise.description,
                            duration: exercise.duration,
                            date: exercise.date
                        };
                    });
                    done(null, formattedExercises, userFound);
                } else {
                    done(null, "No exercises found.")
                }
            });
        } else {
            done(null, "User not found.")
        }
    });
};

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

app.post('/api/users', (req, res) => {
    let { username } = req.body;
    console.log(username);
    createUser(username, (err, data) => {
        if(err) console.error(err);
        if(data != 'Username already taken.'){
            res.json({
                username: data.user_name,
                _id: data._id
            });
        } else {
            res.send('Username already taken');
        }
    });
});

app.get('/api/users', (req, res) => {
    findUsers((err, users) => {
        let foundUsers = users.map((user) => {
            return {
                username: user.user_name,
                _id: user._id
            };
        });
        res.send(foundUsers);
    });
});

app.post('/api/users/:_id/exercises', (req, res) => {
    let exercise = {
        _id: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    };
    createExercise(exercise, (err, exercise, user) => {
        if(err) return console.error(err);
        if(exercise != "User does not exist."){
            res.json({
                _id: exercise._id,
                username: user.user_name,
                date: exercise.date,
                duration: exercise.duration,
                description: exercise.description 
            });
        } else {
            res.send("User does not exist.");
        }
    });
});
app.get('/api/users/:_id/logs', (req, res) => {
    let userId = req.params._id;
    findExercises(userId, (err, exercises, user) => {
        if(err) return console.error(err);
        if(exercises != "No exercises found." || exercises != "User not found."){
            res.json({
                _id: user._id,
                username: user.user_name,
                count: exercises.length,
                log: exercises
            });
        } else {
            res.send(exercises);
        }
    });
});
