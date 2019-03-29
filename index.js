const express = require('express');
const cors = require('cors');
const app = express();
const upload = require("express-fileupload");
const BodyParser = require('body-parser');
const Routes = require('./routes');
const portNo = 7001;

app.use(upload());
app.use(BodyParser.json());
app.use(cors());
app.use('/', Routes);

app.listen(portNo, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Backend server running in port ' + portNo);
});