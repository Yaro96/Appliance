let express = require('express');
let controller = require('../controllers/units.controller');

let units = express.Router();

units.get('/', controller.getAll);
units.get('/powerOn/:id', controller.powerOn);
units.get('/powerOff/:id', controller.powerOff);
units.get('/run/:id', controller.run);
units.get('/pause/:id', controller.pause);
units.get('/wait/:id', controller.wait);
units.post('/', controller.createNew);
units.patch('/program/:id', controller.setProgram);
units.patch('/centrifuge/:id', controller.setCentrifuge);
units.patch('/timer/:id', controller.setTimer);
units.get('/toggleIntensive/:id', controller.toggleIntensive);
units.delete('/delete/:id', controller.deleteUnit);

module.exports = units;