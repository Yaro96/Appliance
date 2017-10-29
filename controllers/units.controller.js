let model = require('../dataAccesses/units.dataAccess');
let validator = require('../methods/validate.method');

function getAll(req, res) {
    model.getAll((err, result) => {
        if (err) {
            res.status(500).send({success: false, message: 'Internal server error'});
        }
        else if (result.length === 0) {
            res.status(404).send({success: false, message: 'No units found'});
        } else {
            res.status(200).send({success: true, units: result});
        }
    });
}

function createNew(req, res) {
    let idModel = req.body.model;
    if (validator.validateInt(idModel)) {
        model.createNew(idModel, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Model not found'});
                else
                    res.status(201).send({success: true, message: 'Unit added, with ' + result.insertId + " as 'id'"});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function powerOn(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.powerOn(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The unit was already powered ON'});
                else
                    res.status(200).send({success: true, message: 'Powered ON'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function powerOff(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.powerOff(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The unit was already powered OFF'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot power OFF the unit if its state isn't 'waiting'"
                    });
                else
                    res.status(200).send({success: true, message: 'Powered OFF'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function run(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.run(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The unit was already running'});
                else
                    res.status(200).send({success: true, message: "State set to 'running'"});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function pause(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.pause(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The unit was already paused'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot pause the unit if its state isn't 'running'"
                    });
                else
                    res.status(200).send({success: true, message: "State set to 'paused'"});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function wait(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.wait(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The unit was already waiting'});
                else
                    res.status(200).send({success: true, message: "State set to 'waiting'"});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function setProgram(req, res) {
    let id = req.params.id;
    let program = req.body.program;
    if (validator.validateInt(id) && validator.validateInt(program)) {
        model.setProgram(id, program, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The program was already set'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot set the unit's current program if its state isn't 'waiting'"
                    });
                else if (result == 406)
                    res.status(406).send({success: false, message: "Program unavailable for unit's model"});
                else
                    res.status(200).send({success: true, message: 'Program set'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function setCentrifuge(req, res) {
    let id = req.params.id;
    let centrifuge = req.body.centrifuge;
    if (validator.validateInt(id) && validator.validateInt(centrifuge)) {
        model.setCentrifuge(id, centrifuge, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The centrifuge was already set'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot set the unit's centrifuge if its state isn't 'waiting'"
                    });
                else if (result == 406)
                    res.status(406).send({success: false, message: "Centrifuge not valid"});
                else
                    res.status(200).send({success: true, message: 'Centrifuge set'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function setTimer(req, res) {
    let id = req.params.id;
    let minutes = req.body.minutes;
    if (validator.validateInt(id) && validator.validateInt(minutes)) {
        model.setTimer(id, minutes, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 202)
                    res.status(202).send({success: true, message: 'The timer was already set'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot set the unit's timer while it is 'running'"
                    });
                else
                    res.status(200).send({success: true, message: 'Timer set'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}

function toggleIntensive(req, res) {
    let id = req.params.id;
    if (validator.validateInt(id)) {
        model.toggleIntensive(id, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            } else {
                if (result == 404)
                    res.status(404).send({success: false, message: 'Unit not found'});
                else if (result == 403)
                    res.status(403).send({
                        success: false,
                        message: "You cannot toggle 'intensive' if the unit's state isn't 'waiting'"
                    });
                else
                    res.status(200).send({success: true, message: 'Intensive toggled'});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}


module.exports = {
    getAll,
    createNew,
    powerOn,
    powerOff,
    run,
    pause,
    wait,
    setProgram,
    setCentrifuge,
    setTimer,
    toggleIntensive
};