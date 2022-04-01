const Sequelize = require("sequelize");
//Op operator functionality
const {Datatypes, Op} = Sequelize;

const connection = new Sequelize("EventMan", "remote", "P2grupper#mote",{
    dialect: "mysql",
    host: "10.92.0.104",
});

module.exports = connection;