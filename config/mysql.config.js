const mysql = require('mysql');

const parameters={
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appliance'
};

const db = mysql.createConnection(parameters);

db.connect(function (err) {
    if (err) {
        console.log('Error connecting to the MySql Db' + err);
        return;
    }
    console.log("Connection to the MySql DB established");
});

module.exports = {
    db,
    parameters
};
