let db = require('../config/mysql.config').db;
let request = require('request');

function getAll(callback) {
    let query = "SELECT id, rpm FROM centrifuges";
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if(res.length==0)
                return callback(null, 404);
            return callback(null, res);
        }
    });
}

module.exports = {
    getAll
};
