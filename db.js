var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// DB Schemas.
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: {type: String, required: true},
    description: {type: String, required: true },
    duration: {type: Number, required: true},
    date: {type: Date}
});

const userSchema = new Schema({
    user_name: {type: String, required: true},
});

// Create DB models.
let User = mongoose.model("user", userSchema);
let Exercise = mongoose.model("exercise", exerciseSchema);

// Export DB models.
module.exports = {User: User, Exercise: Exercise};