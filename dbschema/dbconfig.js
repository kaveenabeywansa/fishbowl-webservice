var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fish = new Schema({
    name: String,
    desc: String,
    img: String
});

// const Files = new Schema({
//     filepath: String,
//     contentType: String
// });

mongoose.model('Fish', Fish);
// mongoose.model('Files', Files);

mongoose.connect('mongodb://127.0.0.1:27017/fishbowl', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to MongoDB !');
});
module.exports = mongoose;