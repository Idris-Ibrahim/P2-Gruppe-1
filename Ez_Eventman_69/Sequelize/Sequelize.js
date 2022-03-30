const Sequelize = require("sequelize");

const connection = new Sequelize("Eventman", "root", "P2grupper#mote",{
    dialect: "mysql",
    host: "localhost",
});

module.exports = connection;