const Sequelize = require("sequelize");

const connection = new Sequelize("Eventman", "remote", "P2grupper#mote",{
    dialect: "mysql",
    host: "10.92.0.104",
});

module.exports = connection;