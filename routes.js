const express = require('express');
var Routes = express.Router();

const FishController = require('./controller/fish-route');

Routes.use('/fish/', FishController);
module.exports = Routes;