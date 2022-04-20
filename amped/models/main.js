const Sequelize = require("sequelize");
const connection = require("../config");
const express =require('express');

const Main = connection.define("Main", {
    idMain: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    intro:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

module.exports = Main;