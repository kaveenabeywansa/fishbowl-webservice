var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fish = new Schema({
    name: String,
    desc: String,
    img: { data: Buffer, contentType: String }
});

mongoose.model('Fish', Fish);

mongoose.connect('mongodb://127.0.0.1:27017/fishbowl', function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to MongoDB !');
});
module.exports = mongoose;