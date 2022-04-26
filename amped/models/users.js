const Sequelize = require("sequelize");
const connection = require("../config");
const express =require('express');
const bcrypt = require('bcrypt-nodejs');

const Users = connection.define("Users", {
    idUsers: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Users;