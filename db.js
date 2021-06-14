var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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

// Export DB models.
module.exports = {User: User, Exercise: Exercise};