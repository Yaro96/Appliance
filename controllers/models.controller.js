let model = require('../dataAccesses/models.dataAccess');
let validator = require('../methods/validate.method');


function getAll(req, res) {
    model.getAll((err, result) => {
        if (err) {
            res.status(500).send({success: false, message: 'Internal server error'});
        }
        else if (result.length === 0) {
            res.status(404).send({success: false, message: 'No models found'});
        } else {
            res.status(200).send({success: true, models: result});
        }
    });
}

function getPrograms(req, res) {
    let name = req.params.name;
    if (validator.validateString(name)) {
        model.getPrograms(name, (err, result) => {
            if (err) {
                res.status(500).send({success: false, message: 'Internal server error'});
            }
            else if (result.length === 0) {
                res.status(404).send({success: false, message: 'Model not found'});
            } else {
                res.status(200).send({success: true, model: result});
            }
        });
    } else
        res.status(400).send({success: false, message: 'Bad Request'});
}


module.exports = {
    getAll,
    getPrograms
};