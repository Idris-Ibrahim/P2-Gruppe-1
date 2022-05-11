const Sequelize = require("sequelize");
const connection = require("../config");
const express =require('express');
const Events = require("../models/events");

const Groups = connection.define("Groups", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    group_name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    group_about:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    group_email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fburl:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    roles:{
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
        
}});

Events.belongsTo(Groups, {
    targetKey: 'group_name',
    foreignKey: 'group_id',
    as: 'group_name'
})


module.exports = Groups;