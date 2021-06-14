let { createUser } = require('./dbMethods.js');
let { findUsers } = require('./dbMethods.js');
let { createExercise } = require('./dbMethods.js');
let { findExercises } = require('./dbMethods.js');

const newUser = (req, res) => {
    let { username } = req.body;
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
}

const getUser = (req, res) => {
    findUsers((err, users) => {
        let foundUsers = users.map((user) => {
            return {
                username: user.user_name,
                _id: user._id
            };
        });
        res.send(foundUsers);
    });
}

const newExercise = (req, res) => {
    let exercise = {
        userId: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    };
    createExercise(exercise, (err, exercise, user) => {
        if(err) return console.error(err);
        if(exercise != "User does not exist."){
            res.json({
                _id: exercise.userId,
                username: user.user_name,
                date: exercise.date.toDateString(),
                duration: Number(exercise.duration),
                description: exercise.description 
            });
        } else {
            res.send("User does not exist.");
        }
    });
}

const getExercises = (req, res) => {
    let query = req.query;
    let userId = req.params._id;
    findExercises(userId, query, (err, exercises, user) => {
        if(err) return console.error(err);
        if(exercises !== "No exercises found." && exercises !== "User not found."){
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
}

module.exports = {
    newUser: newUser,
    getUser: getUser,
    newExercise: newExercise,
    getExercises: getExercises
};