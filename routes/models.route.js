let express = require('express');
let controller = require('../controllers/models.controller');

let models = express.Router();

models.get('/', controller.getAll);
models.get('/:name', controller.getPrograms);

module.exports = models;