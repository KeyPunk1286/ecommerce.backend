require('dotenv').config()
const { Sequelize } = require('sequelize')

const db_dialect = 'postgres'
const db_port = process.env.DB_PORT
const db_host = process.env.DB_HOST
const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const sequelize = new Sequelize(
    db_name, db_user, db_pass, {
    host: db_host,
    port: db_port,
    dialect: db_dialect
});

module.exports = sequelize