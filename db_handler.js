const mysql = require('mysql');
const config = require("./config")

const connexion = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
});

connexion.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("Connexion successful to database at " + config.db_host)
});

module.exports.connexion = connexion;