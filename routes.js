const express = require('express');
var Routes = express.Router();

const FishRoutes = require('./route/fish-route');
const FileUploadRoutes = require('./route/fileupload-route');

Routes.use('/fish/', FishRoutes);
Routes.use('/file/', FileUploadRoutes);

module.exports = Routes;