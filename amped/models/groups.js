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


Groups.hasMany(Events, {
    foreginKey: 'group_id',
    sourceKey: 'id'
})

Events.belongsTo(Groups, {
    targetKey: 'id',
    foreignKey: 'group_id'
})


module.exports = Groups;