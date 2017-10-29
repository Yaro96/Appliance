let model = require('../dataAccesses/centrifuges.dataAccess');

function getAll(req, res) {
    model.getAll((err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: 'Internal server error' });
        }
        else if (result.length === 0) {
            res.status(404).send({ success: false, message: 'No centrifuges found' });
        } else {
            res.status(200).send({ success: true, centrifuges: result });
        }
    });
}

module.exports = {
    getAll
};