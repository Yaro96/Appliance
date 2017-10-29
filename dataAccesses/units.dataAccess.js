let db = require('../config/mysql.config').db;
let request = require('request');

function getAll(callback) {
    let query = "SELECT u.id, m.name as model, p.name as powerState, s.name as state, c.name as currentProgram, u.timer, f.rpm as centrifuge, u.intensive " +
        "FROM units u, models m, powerstates p, states s, programs c, centrifuges f " +
        "WHERE u.model=m.id AND u.powerState=p.id AND u.state=s.id AND u.currentProgram=c.id AND u.centrifuge=f.id " +
        "ORDER BY u.id";
    db.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(null, res);
        }
    });
}

function createNew(idModel, callback) {
    let query1 = "SELECT `id` FROM `models` WHERE id=?"
    let query2 = "INSERT INTO units (model) " +
        "VALUES (?);";
    db.query(query1, [idModel], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else
                db.query(query2, [idModel], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function powerOn(id, callback) {
    let query1 = "SELECT `id`, `powerState`, `state` FROM `units` WHERE id=?"
    let query2 = "UPDATE units SET powerState=1 " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].powerState == 1)
                return callback(null, 202);
            else
                db.query(query2, [id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function powerOff(id, callback) {
    let query1 = "SELECT `id`, `powerState`, `state` FROM `units` WHERE id=?"
    let query2 = "UPDATE units SET powerState=0 " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].powerState == 0)
                return callback(null, 202);
            else if (res[0] && res[0].state != 3)
                return callback(null, 403);
            else
                db.query(query2, [id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function run(id, callback) {
    let query1 = "SELECT `id`, `powerState`, `state` FROM `units` WHERE id=?"
    let query2 = "UPDATE units SET state=2 " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].state == 2)
                return callback(null, 202);
            else
                db.query(query2, [id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function pause(id, callback) {
    let query1 = "SELECT `id`, `powerState`, `state` FROM `units` WHERE id=?"
    let query2 = "UPDATE units SET state=1 " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].state == 1)
                return callback(null, 202);
            else if (res[0] && res[0].state != 2)
                return callback(null, 403);
            else
                db.query(query2, [id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function wait(id, callback) {
    let query1 = "SELECT `id`, `powerState`, `state` FROM `units` WHERE id=?"
    let query2 = "UPDATE units SET state=3 " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].state == 3)
                return callback(null, 202);
            else
                db.query(query2, [id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function setProgram(id, program, callback) {
    let query1 = "SELECT `id`, `model`, `state`, `currentProgram` FROM `units` WHERE id=?";
    let query2 = "SELECT m.idModel, m.idProgram, p.defaultCentrifuge " +
        "FROM models_programs m JOIN programs p ON m.idProgram=p.id " +
        "WHERE m.idModel=? AND m.idProgram=?";
    let query3 = "UPDATE units SET currentProgram=?, centrifuge=? " +
        "WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].currentProgram == program)
                return callback(null, 202);
            else if (res[0] && res[0].state != 3)
                return callback(null, 403);
            else
                db.query(query2, [res[0].model, program], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        if (res.length == 0)
                            return callback(null, 406);
                        db.query(query3, [program, res[0].defaultCentrifuge, id], (err, res) => {
                            if (err) {
                                console.log(err);
                                return callback(err);
                            } else {
                                return callback(null, res);
                            }
                        });
                    }
                });
        }
    });
}

function setCentrifuge(id, centrifuge, callback) {
    let query1 = "SELECT `id`, `model`, `state`, `centrifuge` FROM `units` WHERE id=?";
    let query2 = "SELECT id FROM centrifuges WHERE id=?";
    let query3 = "UPDATE units SET centrifuge=? WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].centrifuge == centrifuge)
                return callback(null, 202);
            else if (res[0] && res[0].state != 3)
                return callback(null, 403);
            else
                db.query(query2, [centrifuge], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        if (res.length == 0)
                            return callback(null, 406);
                        db.query(query3, [centrifuge, id], (err, res) => {
                            if (err) {
                                console.log(err);
                                return callback(err);
                            } else {
                                return callback(null, res);
                            }
                        });
                    }
                });
        }
    });
}

function setTimer(id, minutes, callback) {
    let query1 = "SELECT `id`, `state`, TIME_TO_SEC(timer)/60 as timer FROM `units` WHERE id=?";
    let query2 = "UPDATE units SET timer=SEC_TO_TIME(?*60) WHERE id = ?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].timer == minutes)
                return callback(null, 202);
            else if (res[0] && res[0].state == 2)
                return callback(null, 403);
            else
                db.query(query2, [minutes, id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
}

function toggleIntensive(id, callback) {
    let query1 = "SELECT `id`, `state`, `intensive` FROM `units` WHERE id=?"
    let query2 = "UPDATE `units` SET `intensive`=? WHERE id=?";
    db.query(query1, [id], (err, res) => {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            if (res.length == 0)
                return callback(null, 404);
            else if (res[0] && res[0].state != 3)
                return callback(null, 403);
            else
                db.query(query2, [!res[0].intensive, id], (err, res) => {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    } else {
                        return callback(null, res);
                    }
                });
        }
    });
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
