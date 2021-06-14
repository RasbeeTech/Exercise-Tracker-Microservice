let { User } = require('./db.js');
let { Exercise } = require('./db.js');

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

module.exports = {
    createUser: createUser,
    findUsers: findUsers,
    createExercise: createExercise,
    findExercises: findExercises
};