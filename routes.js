const express = require('express');
var Routes = express.Router();

const FishRoutes = require('./route/fish-route');
const FileUploadRoutes = require('./route/fileupload-route');
const UserRoutes = require('./route/user-route');

Routes.use('/fish/', FishRoutes);
Routes.use('/file/', FileUploadRoutes);
Routes.use('/users/', UserRoutes);
Routes.use('/', function(req, res) {
    res.sendFile(__dirname+'/home.html');
});

module.exports = Routes;