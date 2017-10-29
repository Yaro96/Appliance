let express = require('express');
let controller = require('../controllers/reset.controller');

let reset = express.Router();

reset.get('/', controller.reset);

module.exports = reset;