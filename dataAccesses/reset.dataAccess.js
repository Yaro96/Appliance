let mysql = require('mysql');
let parameters = require('../config/mysql.config').parameters;
let request = require('request');
let fs = require('fs');

let sql=fs.readFileSync('appliance.sql',{ encoding: 'utf8' });
let params = parameters;
params.multipleStatements = true;

function reset(callback) {
    let connection = mysql.createConnection(params);
    let drop = "DROP DATABASE appliance; CREATE DATABASE appliance; USE appliance;";
    connection.query(drop, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            connection.query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    connection.end();
                    return callback(null, res);
                }
            });
        }
    });
}


module.exports = {
    reset
};
