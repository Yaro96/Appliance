let model = require('../dataAccesses/reset.dataAccess');

function reset(req, res) {
    model.reset((err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: 'Internal server error' });
        } else {
            res.status(205).send({ success: true, message: 'Database cleanded' });
        }
    });
}

module.exports = {
    reset
};