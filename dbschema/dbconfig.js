var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fish = new Schema({
    name: String,
    category: String,
    desc: String,
    length: Number,
    mass: Number,
    img: String
});

const User = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    userlevel: Number
})

mongoose.model('Fish', Fish);
mongoose.model('User', User);

mongoose.connect('mongodb://localhost:27017/fishbowl', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to MongoDB !');
});
module.exports = mongoose;
