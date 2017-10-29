let db = require('../config/mysql.config').db;
let request = require('request');

function getAll(callback) {
    let query = "SELECT m.id, m.name, c.weightKgs as Kilograms, c.weightLbs as Pounds " +
        "FROM models m JOIN capacities c ON m.capacity=c.id";
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(null, res);
        }
    });
}

function getPrograms(name, callback) {
    let query = "SELECT m.id, m.name, c.weightKgs as Kilograms, c.weightLbs as Pounds, p.id as idProgram, p.name as programName, p.temperature, p.time, d.rpm as centrifuge, p.prewash, p.wash, p.rinse " +
        "FROM models m JOIN capacities c ON m.capacity=c.id JOIN models_programs mp ON m.id=mp.idModel JOIN programs p ON mp.idProgram=p.id JOIN centrifuges d ON p.defaultCentrifuge=d.id " +
        "WHERE m.name=? ORDER BY idProgram";
    db.query(query, [name], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(null, formatPrograms(res));
        }
    });
}

function formatPrograms(res) {
    let obj = {};
    let programs = [];
    if (res.length > 0) {
        obj.id = res[0].id;
        obj.name = res[0].name;
        obj.Kilograms = res[0].Kilograms;
        obj.Pounds = res[0].Pounds;
        for (let i of res) {
            let program = {};
            program.id = i.idProgram;
            program.name = i.programName;
            program.temperature = i.temperature;
            program.time = i.time;
            program.centrifuge = i.centrifuge;
            program.prewash = i.prewash;
            program.wash = i.wash;
            program.rinse = i.rinse;
            programs.push(program);
        }
        obj.programs = programs;
        return obj;
    } else
        return res;
}

module.exports = {
    getAll,
    getPrograms
};
