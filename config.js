const config = {}
const env = require('dotenv').config({path: '.env'})

config.webProtocol = "http"
config.webHost = "localhost"
config.webPort = 3000

config.db_host = process.env.SQL_HOST
config.db_user = process.env.SQL_USER
config.db_password = process.env.SQL_PASSWORD
config.db_database = process.env.SQL_DATABASE

module.exports = config