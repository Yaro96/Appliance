let express = require('express');
let controller = require('../controllers/centrifuges.controller');

let models = express.Router();

models.get('/', controller.getAll);

module.exports = models;